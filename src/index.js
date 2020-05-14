require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectionUri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@education-tool-api-cluster-rcnpy.mongodb.net/education?retryWrites=true&w=majority`;

app.use(express.json());

mongoose.connect(connectionUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const appRouter = express.Router();
app.use('/api/v1', appRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('server started!'));

module.exports = appRouter;

process.on('unhandled', (error) =>
  console.error('An unhandled error has occurred\n', error),
);
