(async () => {
  const token = "9f3ff7fe0b6d85bb";
  
  const url = `https://hackattic.com/challenges/help_me_unpack/problem?access_token=${token}`;

  const { bytes } = await fetch(url, {
    headers: { Accept: "application/json" },
  }).then((r) => r.json());

  const buf = Buffer.from(bytes, "base64");

  const result = {
    int: buf.readInt32LE(0),
    uint: buf.readUInt32LE(4),
    short: buf.readInt16LE(8),
    float: buf.readFloatLE(10),
    double: buf.readDoubleLE(14),
    big_endian_double: buf.readDoubleBE(22),
  };

  console.log("Decoded ➜", result);

  const response = await fetch(
    `https://hackattic.com/challenges/help_me_unpack/solve?access_token=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    }
  ).then((r) => r.json());

  console.log("Hackattic says ➜", response);
})();
