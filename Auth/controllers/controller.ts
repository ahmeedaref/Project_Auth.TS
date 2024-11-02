import 'dotenv/config';

import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';

import Client, { ClientsI } from '../models/client';
import Items, { Item } from '../models/items';

export const register = async (
    req: express.Request,
    res: express.Response,
): Promise<void> => {
    try {
        const {name, email, password,role} = req.body;
        if (!name || !email || !password) {
            res.status(403).json({message: 'please fetch all data'});
        }
        const client = await Client.findOne({email});

        if (!client) {
            const hashPassword = await bcrypt.hash(password, 10);
            Client.create({
                name,
                email,
                password: hashPassword,
                role,
            });
            res.status(200).json({message: 'Registered Successfully'});
        } else {
            res.status(400).json({message: 'this email already exits'});
        }
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export const login = async (
    req: express.Request,
    res: express.Response,
): Promise<void> => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(403).json({message: 'please fetch all data'});
        }
        const client: any = await Client.findOne({email});
        if (!client) {
            res.status(400).json({message: 'Wrong email or password'});
        }
        const accessToken = jwt.sign(
            {
                id: client._id,
                email: client.email,
                role: client.role,
                name: client.name,
            },
            process.env.ACCESSTOKENSECRET as string,
            {expiresIn: '1h'},
        );
        res.status(200).json({message: 'logged successfully', accessToken});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export const create = async (
    req: express.Request,
    res: express.Response,
): Promise<void> => {
    try {
        const {title, price, quantity} = req.body;
        if (!title || !price || !quantity) {
            res.status(402).json({
                message: 'please fetch all data about the item',
            });
        }

        const item = await Items.findOne({title});

        if (!item) {
            const Item = await Items.create({
                title,
                price,
                quantity,
            });
            res.status(200).json({
                message: 'the item created successfully',
                Item,
            });
        } else {
            res.status(403).json({message: 'this item already exits'});
        }
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export const getAllItems = async (
    req: express.Request,
    res: express.Response,
): Promise<void> => {
    try {
        const item = await Items.find({});
        res.status(200).json({message: item});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};
export const getItem = async (
    req: express.Request,
    res: express.Response,
): Promise<void> => {
    try {
        const {id} = req.params;
        const item = await Items.findById(id);
        if (item) {
            res.status(200).json({data: item});
        } else {
            res.status(404).json({message: 'Item not found'});
        }
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};
export const updateItem = async (
    req: express.Request,
    res: express.Response,
): Promise<void> => {
    try {
        const {id} = req.params;
        const item = await Items.findByIdAndUpdate(id, req.body);
        if (!item) {
            res.status(404).json({message: 'item not found'});
        } else {
            const updatedItem = await Items.findById(id);
            res.status(200).json({
                message: 'Updated Successfully',
                updatedItem,
            });
        }
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};
export const deleteItem = async (
    req: express.Request,
    res: express.Response,
): Promise<void> => {
    try {
        const {id} = req.params;
        const item = await Items.findByIdAndDelete(id);
        if (!item) {
            res.status(404).json({message: 'Item not found'});
        } else {
            res.status(200).json({message: 'Item Deleted successfully'});
        }
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};
