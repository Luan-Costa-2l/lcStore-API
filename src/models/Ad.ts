import mongoose, { Schema, Types } from "mongoose";

export interface AdInstance {
    userId: Types.ObjectId;
    state: string;
    category: string;
    images: object[];
    dateCreated: Date;
    title: string;
    price: number;
    priceNegotiable: boolean;
    description: string;
    views: number;
    status: string;
}

const AdSchema = new Schema<AdInstance>({
    userId: String,
    state: String,
    category: String,
    images: [Object],
    dateCreated: Date,
    title: String,
    price: Number,
    priceNegotiable: Boolean,
    description: String,
    views: Number,
    status: String
});

const modelName = 'Ad';
let Ad;

if(mongoose.connection && mongoose.connection.models[modelName]) {
    Ad = mongoose.connection.models[modelName];
} else {
    Ad = mongoose.model<AdInstance>(modelName, AdSchema);
}

export default Ad as mongoose.Model<AdInstance,  {_id: Types.ObjectId}>;