import db from "../../../modules/database.module.js";
import { errorDefault } from "../../../modules/errors.module.js";

import { loginMW } from "../../../middlewares/user.middleware.js";

import { DefaultRestRoute } from "../../../interfaces/routes.interface.js";
import { ResponseSuccess } from "../../../interfaces/response.interface.js";
import { UserDocument } from "../../../interfaces/database.interface.js";
import { Request, Response } from "express";
import { Filter, FindOptions } from "mongodb";

//todo: implement login system

const route: DefaultRestRoute = {
    endpoint: "login",
    method: "post",
    middlewares: [ loginMW ],
    handler: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const userCollection = db.collection("users");

        const findUserQueryBody: Filter<UserDocument> = {
            email: email,
            password: password
        };

        const findUserQueryFilter: FindOptions<UserDocument> = {
            projection: {
                _id: 1
            }
        }

        const user = await userCollection.findOne(findUserQueryBody, findUserQueryFilter);

        if (!user) {
            errorDefault.message = "Request error: User not found";
            res.status(404).json(errorDefault);
            return;
        }
        else {
            const userDataResponse: ResponseSuccess = {
                status: "success",
                data: {
                    message: "User logged in correctly"
                }
            };

            res.status(200).json(userDataResponse);
            return;
        }
    }
}

export default route;