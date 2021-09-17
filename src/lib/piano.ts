import { Constants } from './constants';

export class Piano {
  static Notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'].map(n => ({
    noteName: n, isSharp: n.length === 2,
  }));

  static TypeTempoChange = 'TYPE_TEMPO_CHANGE';

  static TypePedal = 'TYPE_PEDAL';
 
  static TypeNote = 'TYPE_NOTE';
 
  static TypeUnknownMeta = 'TYPE_UNKNOWN_META';

  static TypeUnknownControl = 'TYPE_UNKNOWN_CONTROL';

  static PositionUp = 'Up';

  static PositionDown = 'Down';

  #midi = null;

  bpm = 120;

  multiplier = 1;

  constructor(midi, private debug = false) {
    this.#midi = midi;

    this.resetTempo();
  }

  resetTempo() {
    const midi = this.#midi;

    if (midi.meta.type === 0) return;

    const tempoMessage = midi.tracks[0].messages.find(({ metaType }) => metaType === Constants.TempoMessage);

    if (!tempoMessage) return;

    if (midi.meta.type === 1) this.updateTempo(tempoMessage.data);
  }

  updateTempo(tempo) {
    this.bpm = Math.round(60000000 / tempo);
    this.multiplier = (60000 / (this.bpm * this.#midi.meta.timeDivision.value));
  }

  /**
   * Automatically calls callback when note plays. Maintains tempo.
   */
  play(trackOrCallback, callback = null) {
    this.resetTempo();

    if (typeof trackOrCallback === 'function') {
      callback = trackOrCallback;

      trackOrCallback = this.#midi.meta.type === 0 ? 0 : 1;
    }

    let totalTimer = 0;

    const stats = {
      highest: -Infinity,
      lowest: Infinity,
    };

    this.#midi.tracks[trackOrCallback].messages.forEach(message => {
      const { type, ...read } = this.read(message);
      

      if (read.note > stats.highest) stats.highest = read.note;
      if (read.note < stats.lowest) stats.lowest = read.note;

      totalTimer += read.scaledDeltaTime;

      if (type !== Piano.TypeNote) return;

      setTimeout(() => {
        callback(read);
      }, totalTimer);
    });

    if (this.debug) console.log({ stats });
  }

  read(message, updateTempo = true): any {
    const { statusType, metaType, deltaTime, data, type } = message;
    const baseData = {
      deltaTime,
      scaledDeltaTime: deltaTime * this.multiplier,
    };

    // console.log(statusType);
    
    if (type === Constants.ControlMessage) {
      if (data[0] === 64) {
        return { ...baseData, type: Piano.TypePedal, position: data[1] === 0 ? Piano.PositionUp : Piano.PositionDown }
      }

      return { ...baseData, type: Piano.TypeUnknownControl, data, message };
    }

    if (statusType === Constants.MetaMessage) {
      // We only handle tempo changes. Other metadata is considered unknown.
      if (metaType !== Constants.TempoMessage) return { ...baseData, type: Piano.TypeUnknownMeta };

      if (updateTempo) this.updateTempo(data);

      return { ...baseData, type: Piano.TypeTempoChange };
    }

    const [note, velocity] = data;

    // Add if note on/off. Add if tempo switch.
    return {
      ...baseData,
      ...this.noteInfo(note),
      type: Piano.TypeNote,
      position: velocity === 0 ? Piano.PositionUp : Piano.PositionDown,
      velocity,
    }
  }

  noteInfo(note): NoteInfo {
    return {
      note,
      ...Piano.Notes[(note + 3) % Piano.Notes.length],
      scale: Math.floor((note / Piano.Notes.length) - 1),
    };
  }
}

export interface NoteInfo {
  note: number;
  scale: number;
  noteName: string;
  isSharp: boolean;
}
