import { Schema, model } from 'mongoose'

const todolistUserSchema = new Schema({
  id: Number,
  name: String,
  weight: Number,
  password: String,
  email: String
});

export default model('Tarefa', todolistUserSchema)