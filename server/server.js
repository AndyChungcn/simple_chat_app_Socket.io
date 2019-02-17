const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(path.join(__dirname, "../public"));

app.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});
