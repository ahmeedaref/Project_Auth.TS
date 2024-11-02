import mongoose from 'mongoose';

export interface ClientsI extends mongoose.Document {
    name: String;
    email: String;
    password: String;
    role: String;
}
const clientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['AdminUser', 'SuperAdmin',"Adminstration"], default: 'AdminUser'},
});

export default mongoose.model<ClientsI>('Client', clientSchema);
