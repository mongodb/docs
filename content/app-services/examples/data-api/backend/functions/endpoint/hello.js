exports = async function hello(req, res) {
  const { name } = JSON.parse(req.body.text());
  return {
    date: new Date(),
    greeting: `Hello, ${name ?? "stranger"}!`,
  };
};
