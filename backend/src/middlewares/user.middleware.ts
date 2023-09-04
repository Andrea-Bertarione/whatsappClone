import { RequestHandler, Request, Response, NextFunction } from "express";
import { ResponseError } from "../interfaces/response.interface.js";

let errorDefault: ResponseError = {
    status: "error",
    message: "default error message"
}

export const registerMW: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        errorDefault.message = "Request body is empty";
        return res.status(400).json(errorDefault);
    }

    if (!req.body.email) {
        errorDefault.message = "Request body.email parameter is missing or empty";
        return res.status(400).json(errorDefault);
    }

    if (!req.body.password) {
        errorDefault.message = "Request body.password parameter is missing or empty";
        return res.status(400).json(errorDefault);
    }

    next();
}