/****************************************************************************** ***
 * ITE5315 – Project
 * I declare that this assignment is my own work in accordance with Humber Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students. *
 * Group member Name: Juan Gutierrez Student IDs: N01469217 Date: 29-Nov-2022
 ****************************************************************************** ***/

import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";
import connectDb from "./database/MongoDbConfig.js";
import { apolloServer, expressMiddleware } from "./graphql/setup.js";

//Choosen architekture: 3 layer architecture
//Router -> Controller -> Service Layer (Data Access Layer)

//To load env variables into the process global object
dotenv.config();

//Create server
const app = express();

const PORT = process.env.PORT || 5001;

async function appBootstrap() {
  try {
    await connectDb();
    await apolloServer.start();

    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

    //Configure server
    app.use("/graphql", cors(), express.json(), expressMiddleware(apolloServer));
    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(bodyParser.json({ limit: "30mb", extended: true }));
    app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
    app.use("/api/Movies", movieRoutes);
  } catch (err) {
    console.log("Error: ", err.message);
    process.exit(1);
  }
}
//To connect to the Db

appBootstrap();
