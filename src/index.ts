import fs from "fs";
import express from "express";
import { ApolloServer, IResolvers } from "apollo-server-express";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";

import { Resolvers } from "./defs";
import { moveMessagePortToContext } from "worker_threads";
import moment from "moment";
const typeDefs = fs.readFileSync("../schema.gql", { encoding: "utf-8" });

const dateResolver = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
};
const resolvers: Resolvers = {
  ...dateResolver,
  Query: {
    christmasDay: (parent, args, ctx, info) => {
      return new Date("2020-12-25");
    },
    lunchTime: (parent, args, ctx, info) => {
      let d = new Date();
      d.setHours(12);
      d.setMinutes(30);
      return d;
    },
    now: (parent, args, ctx, info) => {
      return new Date();
    },
    aWeekAgo: (parent, args, ctx, info) => {
      // args.input is type Date;
      return moment(args.input).subtract(7, "days").toDate();
    },
    sixMinutesForward: (parent, args, ctx, info) => {
      return moment(args.input).add(6, "minutes").toDate();
    },
  },
};
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: {
    ...(resolvers as IResolvers<any, any>),
  },
  introspection: true,
  playground: true,
  debug: true,
});

const expressServer = express();

expressServer.get("/", (req, res) => {
  res.send("hello world");
});
apolloServer.applyMiddleware({ app: expressServer });

expressServer.listen(5000, () => {
  console.log("listening on port 5000");
});
