import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routerSetup } from "./src/router.js";
import { prConfigs } from "./src/configs/configs.js";

import { Application } from "express";

const { isDebug, port} = prConfigs;
const app: Application = express();

try {
    dotenv.config({ path: "./backend/.env" });
  } catch (error) {
    console.error("Error loading environment variables:", error);
    process.exit(1);
}

export const main = async () => {
    if (isDebug) {
        console.time("Start up time");
    }

    app.use(express.json());
    app.use(cors());

    await routerSetup(app);
    
    app.listen(port, () => {
        console.log("Api running on port: ", port);
    
        if (isDebug) {
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

main(); //testing app