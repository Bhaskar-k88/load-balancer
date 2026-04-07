const express = require("express");
const cors = require("cors");
const routes = require("./routes"); // import routes.js

const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use("/", routes);

app.listen(3003, () => console.log("Server 3 running on port 3003"));