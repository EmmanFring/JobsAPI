const express = require("express");
const cors = require("cors");
const { sequelizeConfig } = require("./database/config");
const { jobsRouter } = require("./routes/jobsRouter");
const { usersRouter } = require("./routes/usersRouter");
const { auth } = require("./middlewares/authMiddleware");
const swaggerUi = require("swagger-ui-express");
const { swaggerDocument } = require("./docs/swagger");
app = express()
app.use(express.static('./public'));

// models folder for the schema
// database folder for the configuration to connect to the database
//controllers for the  route handler function

// makes the data from your post/put request in a format that's easy to manipulate by devs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send(
    '<a href="https://jobsapi-lfz8.onrender.com/api-docs">Swagger API Docs</a>'
  );
});

app.use(usersRouter);
// auth on the jobsrouter because we need permissions to manipulate jobs
app.use(jobsRouter);
const port = 8000;
app.listen(port, async () => {
  try {
    await sequelizeConfig.authenticate();
    // keep existing data and update the schema
    await sequelizeConfig.sync({ alter: true, force: false });
  } catch (error) {
    console.log(error);
  }
  console.log(`listening on ${port}`);
});
