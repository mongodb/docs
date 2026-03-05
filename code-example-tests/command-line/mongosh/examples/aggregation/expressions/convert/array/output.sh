[
  {
    original: [],
    convertedVector: Binary.fromPackedBits(new Uint8Array([]))
  },
  {
    original: [
      false, true,  true,  true,
      true,  true,  true,  true,
      false, false, false, false,
      false, true,  true,  true
    ],
    convertedVector: Binary.fromPackedBits(new Uint8Array([ 127, 7 ]))
  },
  {
    original: [ 0, 1, 0, 10 ],
    convertedVector: Binary.fromInt8Array(new Int8Array([ 0, 1, 0, 10 ]))
  },
  {
    original: [ 0, 1, 0, 1, 3.14 ],
    convertedVector: Binary.fromFloat32Array(new Float32Array([ 0, 1, 0, 1, 3.140000104904175 ]))
  }
]