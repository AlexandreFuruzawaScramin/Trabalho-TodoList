import {Schema,model} from "mongoose"

const todolistCategorySchema = new Schema({
    id:Number,
    name:String,
    color:String
});

export default model('tarefa',todolistCategorySchema)