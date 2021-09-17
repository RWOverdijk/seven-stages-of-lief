import { MidiFile } from './file';
import { Midi } from './midi';
import { Constants } from './constants';

export class MidiParser {
  #file = null;

  /**
   * Messages are allowed to omit their status. Last-known (active) status is used when this happens.
   */
  #activeStatusType = null;

  constructor(data) {
    this.#file = new MidiFile(data);
  }

  static parse(data) {
    return new MidiParser(data).parse();
  }

  /**
   * Validate header. True/false when valid, null when no header was found (EOF).
   * 
   * @param {number} value expected header value
   *
   * @returns {null|boolean}
   */
  validateHeader(value) {
    const header = this.#file.readInt(4);

    if (header === -1) return null;
    if (header !== value) return false;

    // Advance pointer by expected remaining headers size on success.
    this.#file.movePointer(4);

    return true;
  }

  parseFileMeta() {
    const type = this.#file.readInt(2);
    const trackCount = this.#file.readInt(2);
    const timeDivisionData = this.#file.readInt(2);

    return {
      type,
      trackCount,
      timeDivision: {
        type: (1 & timeDivisionData) === 0 ? Constants.TimeDivisionPPQ : Constants.TimeDivisionFPS,
        value: timeDivisionData & ~1,
      },
    };
  }

  parseMessageMetaData(metaType, messageLength) {
    if (Constants.StringMetaTypes.includes(metaType)) return this.#file.readStr(messageLength);
    if (Constants.IntMetaTypes.includes(metaType)) return this.#file.readInt(messageLength);
    if (Constants.MultiIntMetaTypes[metaType]) return this.#file.readInts(1, Constants.MultiIntMetaTypes[metaType]);

    // No custom message parsers.
    return null;
  }

  parseMessageData(metaType) {
    if (Constants.DualIntTypes.includes(metaType)) return this.#file.readInts(1, 2);
    if (Constants.IntTypes.includes(metaType)) return this.#file.readInt(1);

    // No custom message parsers.
    return null;
  }

  parseMessage(statusType) {
    const byteParts = statusType.toString(16).split('');             // split the status byte HEX representation, to obtain 4 bits values

    if (!byteParts[1]) byteParts.unshift('0');                 // force 2 digits

    const type = parseInt(byteParts[0], 16);

    return {
      type,
      channel: parseInt(byteParts[1], 16),
      data: this.parseMessageData(type),
    };
  }

  parseMetaMessage() {
    const metaType = this.#file.readInt(1);

    return { metaType, data: this.parseMessageMetaData(metaType, this.#file.readIntVLV()) }
  }

  readStatusType() {
    const statusType = this.#file.readInt(1);

    if (statusType === -1) return null;
    if (statusType >= 0x80) this.#activeStatusType = statusType; // status bytes are >= 0x80
    else this.#file.movePointer(-1); // Status was omitted, so reset pointer to undo read.

    return this.#activeStatusType;
  }

  readMessage() {
    const deltaTime = this.#file.readIntVLV();
    const statusType = this.readStatusType();

    if (!statusType) return null;

    return {
      deltaTime,
      statusType,
      ...(statusType === Constants.MetaMessage ? this.parseMetaMessage() : this.parseMessage(statusType)), // 0xff is a meta message
    };
  }

  parse() {
    if (!this.validateHeader(Constants.FileHeader)) throw new Error('Invalid or corrupt midi file; header check failed.');
    const midi = new Midi(this.parseFileMeta());
    const tracks = [];

    for (let t = 0; t < midi.meta.trackCount; t++) {
      const track = {
        messages: [],
      };

      const trackValid = this.validateHeader(Constants.TrackHeader);

      if (trackValid === null) break;
      if (trackValid === false) throw new Error('Invalid track found; header check failed.');

      while (true) {
        const message = this.readMessage();

        if (!message || !message.data) break;

        track.messages.push(message);
      }

      tracks.push(track);
    }

    midi.tracks = tracks;

    return midi;
  }
}
