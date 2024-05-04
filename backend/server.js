const app = require("./app");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
