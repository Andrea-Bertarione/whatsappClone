import db from "../../../modules/database.module.js";

import { registerMW } from "../../../middlewares/user.middleware.js";

import { DefaultRestRoute } from "../../../interfaces/routes.interface.js";
import { Request, Response } from "express";

const route: DefaultRestRoute = {
    endpoint: "register",
    method: "put",
    middlewares: [ registerMW ],
    handler: async (req: Request, res: Response) => {
        const collection = db.collection("users");
    }
}

export default route;