import mongoose, { Schema, Types } from "mongoose";

interface CategoryInstance {
    name: string;
    slug: string;
}

const CategorySchema = new Schema<CategoryInstance>({
    name: String,
    slug: String,
});

const modelName = 'Category';
let Category


if(mongoose.connection && mongoose.connection.models[modelName]) {
    Category = module.exports = mongoose.connection.models[modelName];
} else {
    Category = module.exports = mongoose.model(modelName, CategorySchema);
}

export default Category as mongoose.Model<CategoryInstance,  {_id: Types.ObjectId}>;