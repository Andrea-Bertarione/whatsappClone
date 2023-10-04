import db from "@modules/database.module.js";
import { errorDefault } from "@modules/errors.module.js";

import { getUserMW } from "@middlewares/user.middleware.js";

import { UserDocument } from "@interfaces/database.interface.js";
import { ResponseSuccess } from "@interfaces/response.interface.js";
import { DefaultRestRoute } from "@interfaces/routes.interface.js";
import { Request, Response } from "express";
import { Filter, FindOptions, ObjectId } from "mongodb";

const route: DefaultRestRoute = {
    endpoint: ":userId",
    method: "get",
    middlewares: [ getUserMW ],
    handler: async (req: Request, res: Response) => {
        const userId: ObjectId = new ObjectId(req.params.userId);
        const userCollection = db.collection<UserDocument>("users");

        const findUserQueryBody: Filter<UserDocument> = {
            _id: userId,
        };

        const findUserQueryFilter: FindOptions<UserDocument> = {
            projection: {
                name: 1,
                surname: 1,
                email: 1,
                passward: 1
            }
        }

        const user = await userCollection.findOne<UserDocument>(findUserQueryBody, findUserQueryFilter);

        if (!user) {
            errorDefault.message = "Request error: User not found";
            res.status(404).json(errorDefault);
            return;
        }
        else {
            const userDataResponse: ResponseSuccess = {
                status: "success",
                data: {
                    user: user,
                    message: "User found successfully"
                }
            };

            res.status(200).json(userDataResponse);
            return;
        }
    }
}

export default route;