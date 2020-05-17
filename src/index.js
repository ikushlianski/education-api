require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userController = require('./user/user.controller');
const schoolController = require('./school/school.controller');
const classController = require('./class/class.controller');

const app = express();
const connectionUri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@education-tool-api-cluster-rcnpy.mongodb.net/education?retryWrites=true&w=majority`;

app.use(express.json());
mongoose
  .connect(connectionUri, {
    dbName: process.env.DATABASE_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to DB'))
  .catch((err) =>
    console.error('an error occurred while connecting to DB', err),
  );

const appRouter = express.Router();
app.use('/api/v1', appRouter);

appRouter.use([userController, schoolController, classController]);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('server started!'));

module.exports = appRouter;

process.on('unhandledRejection', (error) => {
  console.error('An unhandled error has occurred\n', error);
  process.exit(error.code || 1);
});
