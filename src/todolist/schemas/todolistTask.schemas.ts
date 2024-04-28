import { Schema, model } from "mongoose"

const todolistTaskSchema = new Schema({
    title: String,
    description: String,
    creationDate: Date,
    conclusionDate: Date,
    todoType: String,

    category: {
        type: String,
        required: false
    },
    todoStatus: {
        type: String,
        enum: ["em andamento", "concluida"]
    },
    associatedUser: String
});

export default model('tarefa', todolistTaskSchema)