exports = async function (req, res) {
  const latestHello = {
    greeting: "Hello, Leafie!",
    date: new Date("2023-05-05T01:02:03.456Z"),
  };
  return latestHello;
};
