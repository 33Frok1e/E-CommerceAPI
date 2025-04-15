import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt from 'jsonwebtoken'

const JWT_SECRET = config.jwt_secret as string;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        res.status(401).send({ message: 'Invalid token and acces denied!' })
        return;
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err) {
            res.status(401).send({ message: 'Invalid token and access denied!' })
        }
        (req as any).decoded = decoded;
        next();
    })
}