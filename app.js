import Koa from 'koa';

import mount from 'koa-mount';
import convert from 'koa-convert';
import graphqlHTTP from 'koa-graphql';
import parser from 'koa-bodyparser';
import mongoose from 'mongoose';
import mongoConfig from './config/mongo';
import graphQLSchema from './schema.js';
import cors from 'koa-cors';

mongoose.connect(mongoConfig.connectionString, { server: { socketOptions: { keepAlive: 1 } } });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Mongoose connected.');
});

const app = new Koa();

app.use(convert(cors()));

app.use(mount('/graphql', convert(graphqlHTTP({
  schema: graphQLSchema,
  graphiql: true
}))));

app.listen(5000, (err) => {
  if (err) {
    throw err;
  }

  console.log('Tenhou API server is listening on port 5000');
});
