import db from "@modules/database.module.js";
import { errorDefault } from "@modules/errors.module.js";

import { ChatDocument } from "@interfaces/database.interface.js";
import { ResponseSuccess } from "@interfaces/response.interface.js";
import { DefaultRestRoute } from "@interfaces/routes.interface.js";
import { Request, Response } from "express";
import { Filter, FindOptions, ObjectId, Sort } from "mongodb";

const route: DefaultRestRoute = {
    endpoint: "getAllChats/:userId",
    method: "get",
    middlewares: [  ],
    handler: async (req: Request, res: Response) => {
        const userId: ObjectId = new ObjectId(req.params.userId);
        const chatCollection = db.collection<ChatDocument>("chats");

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

        const sortChatsSettings: Sort = {
            "messages.$.sent": -1
        }

        const chatResult = await chatCollection.find(findChatsQueryBody, findChatsQueryFilter).sort(sortChatsSettings).toArray();

        if (!chatResult || chatResult.length === 0) {
            errorDefault.message = "no chats found for this user";
            return res.status(400).json(errorDefault);
        }

        const userDataResponse: ResponseSuccess = {
            status: "success",
            data: {
                chatsList: chatResult
            }
        };

        res.status(200).json(userDataResponse);
    }
}

export default route;