import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import config from "../../config";
import { UserServices } from "./user.services";

const JWT_SECRET = config.jwt_secret as string;

const registerUsers = async (req: Request, res: Response): Promise<void> => {
    const { email, password, role } = req.body;
    try {
        const existingUser = await UserServices.findUserByEmail(email);
        if(existingUser) {
            res.status(409).send({ message: "User email is already exists! please use another email"})
            return;
        }
        const userRole = role || 'user';
        const user = await UserServices.createUser(email, password, userRole);

        // Exclude password from response
        const userResponse = {
            _id: user._id,
            email: user.email,
            role: user.role,
        };

        res.status(200).send({ message: 'User created successfully!', user: userResponse})
    } catch (err) {
        res.status(500).send({ 
            message: "User registration failed!", 
            error: err instanceof Error ? err.message : 'Unknown error' 
        });
    }
}

const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await UserServices.findUserByEmail(email);
        if(!user) {
            res.status(400).send({ message: "Invalid email"});
            return;
        }

        const isValidPassword = await UserServices.validatePassword(password, user?.password);
        if(!isValidPassword) {
            res.status(400).send({ message: "Invalid password"});
            return;
        }

        const token = jwt.sign({ email: user?.email, role: user?.role }, JWT_SECRET, { expiresIn: '1h'});
        res.status(200).send({ message: "User loggedIn successfully!", token })
    } catch (err) {
        
    }
}

export const UserController = {
    registerUsers,
    loginUser
}