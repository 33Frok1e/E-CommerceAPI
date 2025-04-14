import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import config from "../../config";
import { UserServices } from "./user.services";

const JWT_SECRET = config.jwt_secret;

const registerUsers = async (req: Request, res: Response): Promise<void> => {
    const { email, password, role } = req.body;
    try {
        const existingUser = await UserServices.findUserByEmail(email);
        if(existingUser) {
            res.status(409).send({ message: "User email is already exists! please use a new email"})
            return;
        }
        const userRole = role || 'user';
        const user = UserServices.createUser(email, password, role);
        res.status(200).send({ message: 'User created successfully!', user})
    } catch (err) {
        res.status(500).send({ message: "User registration failed!", err})
    }
}

export const UserController = {
    registerUsers
}