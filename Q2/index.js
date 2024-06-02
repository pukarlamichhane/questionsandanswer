const axios = require("axios");

let data = {
  token: "QUao9cqFzxPgvWJNi9aKac",
  amount: 1000,
};

let config = {
  headers: { Authorization: "test_secret_key" },
};

axios
  .post("https://khalti.com/api/v2/payment/verify/", data, config)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
