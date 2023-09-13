import path from "path";

import { DefaultStaticRoute } from "@interfaces/routes.interface.js";
import { Request, Response } from "express";

const filePath = path.resolve("./frontend/test.html");

const route: DefaultStaticRoute = {
    endpoint: "",
    filePath: filePath,
    middlewares: [],
    handler: async (req: Request, res: Response) => {
        res.status(200).sendFile(filePath);
    }
}

export default route;