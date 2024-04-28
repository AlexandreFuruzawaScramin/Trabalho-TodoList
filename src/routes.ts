import { Router } from 'express'
import ToDoListController from './todolist/controller/todolist.controller'

const routes = Router()

routes.get('/todolist', ToDoListController.findAll)
routes.get('/todolist/:id', ToDoListController.findById)
routes.post('/todolist', ToDoListController.userCreate)
routes.post('/todolist/userLogin', ToDoListController.userLogin)
routes.post('/todolist/taskCreation', ToDoListController.taskCreate)
routes.put('/todolist/:id', ToDoListController.taskUpdate)
routes.delete('/todolist/:id', ToDoListController.taskDelete)

export {
    routes
}