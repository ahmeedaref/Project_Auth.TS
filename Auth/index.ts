import 'dotenv/config';

import express, { Application } from 'express';
import mongoose from 'mongoose';

import router from './routes/routes';

const app:Application = express();
app.use(express.json());
app.use('/', router);

mongoose
    .connect(
        'mongodb+srv://ahmedaref127:ahmeed1902@backenddb.1rq3a.mongodb.net/Node?retryWrites=true&w=majority&appName=BackendDB',
    )
    .then(() => {
        console.log('connected to DB');
        app.listen(3000, () => {
            console.log('the srever is run in port 3000 !');
        });
    })
    .catch((err) => {
        console.log(err);
    });
