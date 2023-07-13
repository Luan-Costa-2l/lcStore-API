import mongoose, { Schema, Types } from "mongoose";

export interface CategoryInstance {
    _id: Types.ObjectId;
    name: string;
    slug: string;
}

const CategorySchema = new Schema<CategoryInstance>({
    name: String,
    slug: String,
});

const modelName = 'Category';
let Category;


if(mongoose.connection && mongoose.connection.models[modelName]) {
    Category = mongoose.connection.models[modelName];
} else {
    Category = mongoose.model(modelName, CategorySchema);
}

export default Category as mongoose.Model<CategoryInstance>;