export class MidiFile {
  #data = null;

  #pointer = 0;

  /**
   * Midi file reader.
   * 
   * @param {Uint8Array} data 
   * @note Ints are big-endian.
   */
  constructor(data) {
    this.#data = new DataView(data.buffer, data.byteOffset, data.byteLength);
  }

  movePointer(bytes) {
    return this.#pointer += bytes;
  }

  /**
   * Read an integer chunk of `bytes` bytes.
   *
   * @param {Number} bytes 
   *
   * @returns {any}
   */
  readInt(bytes) {
    bytes = Math.min(bytes, this.#data.byteLength - this.#pointer);

    if (bytes < 1) return -1;

    let value = 0;

    if (bytes > 1) {
      for (let i = 1; i <= (bytes - 1); i++) {
        value += this.#data.getUint8(this.#pointer) * Math.pow(256, (bytes - i));

        this.#pointer++;
      }
    }

    value += this.#data.getUint8(this.#pointer);

    this.#pointer++;

    return value;
  }

  readInts(bytes, count) {
    const data = [];

    for (let i = 0; i < count; i++) {
      data.push(this.readInt(bytes));
    }

    return data;
  }

  readStr(bytes) {
    let text = '';

    for (let char = 1; char <= bytes; char++) text += String.fromCharCode(this.readInt(1));

    return text;
  }

  /**
   * Read "Variable Length Value" int (defined by size byte)
   * @returns 
   */
  readIntVLV() {
    let value = 0;
    if (this.#pointer >= this.#data.byteLength) return -1;

    if (this.#data.getUint8(this.#pointer) < 128) {
      return this.readInt(1);
    }

    let FirstBytes = [];

    while (this.#data.getUint8(this.#pointer) >= 128) {
      FirstBytes.push(this.readInt(1) - 128);
    }

    for (let dt = 1; dt <= FirstBytes.length; dt++) {
      value += FirstBytes[FirstBytes.length - dt] * Math.pow(128, dt);
    }

    return value + this.readInt(1); // Add last byte
  }
}
