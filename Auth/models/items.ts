import mongoose from 'mongoose';

export interface Item extends mongoose.Document {
    title: String;
    price: Number;
    quantity: Number;
}
const itemSchema = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
});
// export type Items =
//     Required < itemSchema > mongoose.model('Items', itemSchema);
export default mongoose.model<Item>('Items', itemSchema);
