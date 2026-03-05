[
  { original: Binary.fromPackedBits(new Uint8Array([])), asArray: [] },
  {
    original: Binary.fromPackedBits(new Uint8Array([ 127, 7 ])),
    asArray: [
      false, true,  true,  true,
      true,  true,  true,  true,
      false, false, false, false,
      false, true,  true,  true
    ]
  },
  {
    original: Binary.fromInt8Array(new Int8Array([ 0, 1 ])),
    asArray: [ 0, 1 ]
  },
  {
    original: Binary.fromFloat32Array(new Float32Array([ 0.30000001192092896 ])),
    asArray: [ 0.30000001192092896 ]
  },
  {
    original: Binary.fromFloat32Array(new Float32Array([ -Infinity, 0, Infinity ])),
    asArray: [ -Infinity, 0, Infinity ]
  }
]