import 'dotenv/config';

import express from 'express';
import jwt from 'jsonwebtoken';

export async function checkToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): Promise<void> {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(400).json({message: 'please add the accessToken'});
        }

        const decodeToken = jwt.verify(
            token as string,
            process.env.ACCESSTOKENSECRET as string,
        );

        if (!decodeToken) {
            res.status(403).json({message: 'invalid Token or expired'});
        } else {
            return next();
        }
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
}

export async function checkSuperAdmin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): Promise<void> {
    try {
        const authorize = req.headers.authorization;
        const decode: any = jwt.verify(
            authorize as string,
            process.env.ACCESSTOKENSECRET as string,
        );
        if (!decode) {
            res.status(403).json({message: 'Access  Not Allowed'});
        } else {
            const role = decode.role;
            if (role === 'SuperAdmin') {
                next();
            } else {
                res.status(403).json({
                    message: 'Access Not Allowed for your role',
                });
            }
        }
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
}
