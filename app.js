const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/proxy", async (req, res) => {
  const { url, method, headers, data } = req.body;

  try {
    const response = await axios({ url, method, headers, data });
    res.status(response.status).send(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .send(error.response?.data || "Proxy request failed");
  }
});

app.listen(3001, () => {
  console.log("Proxy server running on http://localhost:3001");
});
