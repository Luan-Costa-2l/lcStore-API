import mongoose, { Schema, Types } from "mongoose";

export interface StateInstance {
    _id: Types.ObjectId;
    name: string;
}

const StateSchema = new Schema<StateInstance>({
    name: String,
});

const modelName = 'State';
let State;


if(mongoose.connection && mongoose.connection.models[modelName]) {
    State = module.exports = mongoose.connection.models[modelName];
} else {
    State = module.exports = mongoose.model<StateInstance>(modelName, StateSchema);
}

export default State as mongoose.Model<StateInstance, {_id: Types.ObjectId}>