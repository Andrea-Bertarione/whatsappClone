import { RequestHandler, Request, Response, NextFunction } from "express";
import { errorDefault } from "@modules/errors.module.js";

export const getAllChatsMW: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        errorDefault.message = "Request body is empty";
        return res.status(400).json(errorDefault);
    }

    if (!req.body.offset) {
        errorDefault.message = "Request body.offset parameter is missing or empty";
        return res.status(400).json(errorDefault);
    }

    if (!req.body.userId) {
        errorDefault.message = "Request body.userId parameter is missing or empty";
        return res.status(400).json(errorDefault);
    }

    if (!req.body.filter) {
        errorDefault.message = "Request body.filter parameter is missing or empty";
        return res.status(400).json(errorDefault);
    }
}