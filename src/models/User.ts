import mongoose, { Schema, Types } from "mongoose";

interface UserInstance {
    name: string;
    email: string;
    state: string;
    passwordHash: string;
    token: string;
}

const UserSchema = new Schema<UserInstance>({
    name: String,
    email: String,
    state: String,
    passwordHash: String,
    token: String
});

const modelName = 'User';
let User;


if(mongoose.connection && mongoose.connection.models[modelName]) {
    User = module.exports = mongoose.connection.models[modelName];
} else {
    User = module.exports = mongoose.model<UserInstance>(modelName, UserSchema);
}

export default User as mongoose.Model<UserInstance,  {_id: Types.ObjectId}>;