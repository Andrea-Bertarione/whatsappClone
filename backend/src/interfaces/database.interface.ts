import { Document, ObjectId } from "mongodb";

export interface UserData {
    _id?: ObjectId,
    name?: String,
    surname?: String,
}

export interface UserDocument extends Document, UserData {
    email?: String,
    password?: String,
    birthday?: Date
}

export interface ChatDocument extends Document {
    _id?: ObjectId,
    type?: String,
    messages?: Array<ObjectId>,
    participants?: Array<ObjectId>,
    chatName?: String,
}

export interface MessageDocument extends Document {
    _id?: ObjectId,
    author?: UserData,
    timestamp?: Date,
    content?: String,
}