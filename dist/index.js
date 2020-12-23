"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_iso_date_1 = require("graphql-iso-date");
const typeDefs = fs_1.default.readFileSync("../schema.gql", { encoding: "utf-8" });
const dateResolver = {
    Date: graphql_iso_date_1.GraphQLDate,
    Time: graphql_iso_date_1.GraphQLTime,
    DateTime: graphql_iso_date_1.GraphQLDateTime,
};
const apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs,
    resolvers: Object.assign(Object.assign({}, dateResolver), { Query: {
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
                console.log(args);
                console.log(typeof args.input);
                return new Date();
            },
        } }),
    introspection: true,
    playground: true,
    debug: true,
});
const expressServer = express_1.default();
expressServer.get("/", (req, res) => {
    res.send("hello world");
});
apolloServer.applyMiddleware({ app: expressServer });
expressServer.listen(5000, () => {
    console.log("listening on port 5000");
});
//# sourceMappingURL=index.js.map