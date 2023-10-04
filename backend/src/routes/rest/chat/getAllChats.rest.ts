import db from "@modules/database.module.js";
import { errorDefault } from "@modules/errors.module.js";



import { ChatDocument, MessageDocument } from "@interfaces/database.interface.js";
import { ResponseSuccess } from "@interfaces/response.interface.js";
import { DefaultRestRoute } from "@interfaces/routes.interface.js";
import { Request, Response } from "express";
import { Filter, FindOptions, ObjectId } from "mongodb";

const route: DefaultRestRoute = {
    endpoint: "getAllChats",
    method: "post",
    middlewares: [  ],
    handler: async (req: Request, res: Response) => {
        const userId: ObjectId = new ObjectId(req.body.userId);
        const chatCollection = db.collection<ChatDocument>("chats");
        const messageCollection = db.collection<MessageDocument>("messages");

        const findChatsQueryBody: Filter<ChatDocument> = {
            _id: userId,
        };

        const findChatsQueryFilter: FindOptions<ChatDocument> = {
            projection: {
                type: 1,
                participants: 1,
                chatName: 1,
                "messages.$": 1
            }
        }

    }
}

export default route;