const express = require("express");

const PORT = 8383;
const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello World! ");
});

app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});