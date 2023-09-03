import { RequestHandler } from "express";

export type Method = "post" | "get" | "put" | "delete";

export interface DefaultRestRoute {
    endpoint: String,
    method: Method,
    middlewares: RequestHandler[],
    handler: RequestHandler
}

export interface DefaultStaticRoute {
    endpoint: String,
    filePath: String,
    middlewares: RequestHandler[],
    handler: RequestHandler
}