import { DefaultRestRoute } from "../../../interfaces/routes.interfaces.js";
import { Request, Response } from "express";

const route: DefaultRestRoute = {
    endpoint: "login",
    method: "post",
    middlewares: [],
    handler: async (req: Request, res: Response) => {
        res.status(200).json({
            test: "checkk"
        });
    }
}

export default route;