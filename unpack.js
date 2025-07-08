(async () => {
  const url =
    "https://hackattic.com/challenges/help_me_unpack/problem?access_token=9f3ff7fe0b6d85bb";

  const { bytes } = await fetch(url, {
    headers: { Accept: "application/json" },
  }).then((r) => r.json());

  // 2️⃣  Base64 → raw bytes
  const buf = Buffer.from(bytes, "base64");

  // 3️⃣  Little-endian bloc (first 22 bytes)
  const int = buf.readInt32LE(0); // signed int
  const uint = buf.readUInt32LE(4); // unsigned int
  const short = buf.readInt16LE(8); // signed short
  const float = buf.readFloatLE(10); // float
  const double = buf.readDoubleLE(14); // double

  // 4️⃣  Big-endian double (last 8 bytes)
  const bigEndianDouble = buf.readDoubleBE(22);

  // 5️⃣  Ship it
  console.log({
    int,
    uint,
    short,
    float,
    double,
    big_endian_double: bigEndianDouble,
  });
})();
