export class Constants {
  static FileHeader = 0x4D546864; // MThd

  static TrackHeader = 0x4D54726B; // MTrk

  static TimeDivisionPPQ = 'PPQ';

  static TimeDivisionFPS = 'FPS';

  static TempoMessage = 0x51; // 81

  static MetaMessage = 0xFF; // 255

  static ControlMessage = 0xB; // 11

  static StringMetaTypes = [
    0x01,
    0x02,
    0x03,
    0x04,
    0x05,
    0x07,
    0x06,
  ];

  static IntMetaTypes = [
    0x21,
    0x59,
    0x51,
  ];

  static EndMetaTypes = [
    0x2F, // EOT
    -1, // EOF
  ];

  static MultiIntMetaTypes = {
    0x54: 5, // SMPTE offset
    0x58: 4, // Time signature
  };

  static DualIntTypes = [
    0xA, // Aftertouch note
    0xB, // Controller
    0xE, // Pitch Bend
    0x8, // Note Off
    0x9, // Note On
  ];

  static IntTypes = [
    0xC, // Program change
    0xD, // Aftertouch channel
  ];
}
