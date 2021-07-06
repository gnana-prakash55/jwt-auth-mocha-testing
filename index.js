const express = require("express");
const app = express();
const routes = require("./routes/route");
require("dotenv").config();
const db = require("./db/mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);

if (process.env.NODE_ENV == 'testing'){
    console.log = function() {}
}

async function startServer() {
    await db
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
    console.log(`Server up and running in port ${PORT}`);
  });
}

startServer()

module.exports = app;
