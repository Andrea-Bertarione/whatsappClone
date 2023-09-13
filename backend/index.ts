import express from "express";
import dotenv from "dotenv";
import { routerSetup } from "./src/router.js";

import { Application } from "express";

const port: Number = 8080;
const debug: Boolean = process.argv[2] == "debug";
const app: Application = express();

dotenv.config({path: "./backend/.env"});

const main = async () => {
    if (debug) {
        console.time("Start up time");
    }

    app.use(express.json());

    await routerSetup(app);
    
    app.listen(port, () => {
        console.log("Api running on port: ", port);
    
        if (debug) {
            console.timeEnd("Start up time");
            console.log("Routes registered:")
            app._router.stack.forEach((r: any) => {
                if (r.route && r.route.path){
                    console.log(r.route.path)
                }
            });
        }
    });
}

main();