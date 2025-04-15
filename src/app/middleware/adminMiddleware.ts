import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const userRole = (req as any).decoded?.role;
        if(userRole != 'admin') {
            res.status(403).json({
                success: false,
                message: 'You are not authorized to perform this action!'
            });
            return;
        }
        next();
    } catch (err) {
        next(err)
    }
}