export class Midi {
  // All tracks.
  tracks = [];

  /**
   * - type: 0 (single-track) or 1 (multi-track).
   * - trackCount: 1 for type 0, 2+ for type 1
   */
  meta = null;

  constructor(meta) {
    this.meta = meta;
  }
}
