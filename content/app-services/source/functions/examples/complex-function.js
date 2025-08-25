// You can use ES6 arrow functions
const uppercase = (str) => {
  return str.toUpperCase();
};

// You can use async functions and await Promises
exports = async function GetWeather() {
  // You can get information about the user called the function
  const city = context.user.custom_data.city;

  // You can import Node.js built-ins and npm packages
  const { URL } = require("url");
  const weatherUrl = new URL("https://example.com");
  weatherUrl.pathname = "/weather";
  weatherUrl.search = `?location="${city}"`;

  // You can send HTTPS requests to external services
  const weatherResponse = await context.http.get({
    url: url.toString(),
    headers: {
      Accept: ["application/json"],
    },
  });
  const { current, forecasts } = JSON.parse(weatherResponse.body.text());

  return [
    `Right now ${uppercase(city)} is ${current.temperature}°F and ${current.weather}.`,
    `Here's the forecast for the next 7 days:`,
    forecasts
      .map((f) => `${f.day}: ${f.temperature}°F and ${f.weather}`)
      .join("\n  "),
  ].join("\n");
};
