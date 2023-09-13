import db from "@modules/database.module.js";
import { errorDefault } from "@modules/errors.module.js";

import { registerMW, loginMW } from "@middlewares/user.middleware.js";

import { DefaultRestRoute } from "@interfaces/routes.interface.js";
import { UserDocument } from "@interfaces/database.interface.js";
import { Request, Response } from "express";
import { Filter, FindOptions, InsertOneResult } from "mongodb";
import { ResponseSuccess } from "@interfaces/response.interface.js";

const route: DefaultRestRoute = {
    endpoint: "register",
    method: "put",
    middlewares: [ registerMW, loginMW ],
    handler: async (req: Request, res: Response) => {
        const { name, surname, email, password, birthday } = req.body;
        const userCollection = db.collection<UserDocument>("users");

        const findUserQueryBody: Filter<UserDocument> = {
            email: email
        };

        const findUserQueryFilter: FindOptions<UserDocument> = {
            projection: { id: 1 }
        };

        const userResult = await userCollection.findOne<UserDocument>(findUserQueryBody, findUserQueryFilter);

        if (userResult?._id) {
            errorDefault.message = `Account with email: ${email} already exists.`;
            res.status(400).json(errorDefault);
            return;
        }

        const createNewUserQuery: UserDocument = {
            name: name,
            surname: surname,
            birthday: birthday,
            email: email,
            password: password
        };

        const newUserResult: InsertOneResult<UserDocument> = await userCollection.insertOne(createNewUserQuery);

        if (!newUserResult) {
            errorDefault.message = `Server error: couldn't add user to database`;
            res.status(400).json(errorDefault);
        }
        else {
            const userDataResponse: ResponseSuccess = {
                status: "success",
                data: {
                    message: "User registered correctly"
                }
            };

            res.status(200).json(userDataResponse);
        }
    }
}

export default route;