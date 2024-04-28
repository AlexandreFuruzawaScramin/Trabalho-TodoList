import app from '../src/app'
import { describe, it, afterAll } from '@jest/globals'
import mongoose from 'mongoose'
import todoUserModel from '../src/todolist/schemas/todolistUser.schemas'
import * as request from 'supertest'
import todoTaskModel from '../src/todolist/schemas/todolistTask.schemas'

describe('/todolist endpoint', () => {
    afterAll(async () => {
        await mongoose.connection.close()
    })

    it.skip('Deve inserir um user no banco de dados', async () => {
        const UserMock = {
            id: 123,
            name:'joãozinho',
            weight:100,
            password:'12345',
            email:'oi@hotmail.com'
        }

        const response = await request.default(app).post('/todolist').send(UserMock)
        const findedUser = await todoUserModel.findById(response.body._id)

        expect(response.status).toEqual(201)
        expect(response.body._id).toBeDefined()
        expect(UserMock.id).toBe(findedUser?.id)
        expect(UserMock.name).toBe(findedUser?.name)
        expect(UserMock.weight).toBe(findedUser?.weight)
        expect(UserMock.password).toBe(findedUser?.password)
        expect(UserMock.email).toBe(findedUser?.email)
    })

    it.skip('Deve buscar todos os users no banco de dados', async () => {
        const response = await request.default(app).get('/todolist')
        const totalUserOnDatabase = await todoUserModel.countDocuments()

        expect(response.body.length).toEqual(totalUserOnDatabase)
    })

    it.skip('Deve deletar um usuário do banco de dados', async () => {
        const userIdToDelete = '662d73e11539f6947fb81bd7' // Substitua pelo ID real do usuário
    
        const response = await request.default(app).delete(`/todolist/${userIdToDelete}`);
    
        expect(response.status).toEqual(200);
    
        const deletedUser = await todoUserModel.findById(userIdToDelete);
        expect(deletedUser).toBeNull();
    }, 10000);




    it('Deve atualizar os dados de um usuário no banco de dados', async () => {
        const TaskIdToUpdate = '662d87696e2fa0e00bd94eef';
        const updatedTaskData = {
        title:"teste23",
        description:"naosei1",
        todoType:"tipo23",
        category:"categoria24",
        todoStatus:"em andamento",
        associatedUser:"eu23"
        };

        const response = await request.default(app)
            .put(`/todolist/${TaskIdToUpdate}`)
            .send(updatedTaskData);

        expect(response.status).toEqual(200);

        const updatedUser = await todoTaskModel.findById(TaskIdToUpdate);
        expect(updatedUser?.title).toEqual(updatedTaskData.title);
        expect(updatedUser?.description).toEqual(updatedTaskData.description);
        expect(updatedUser?.todoType).toEqual(updatedTaskData.todoType);
        expect(updatedUser?.category).toEqual(updatedTaskData.category);
        expect(updatedUser?.todoStatus).toEqual(updatedTaskData.todoStatus);
        expect(updatedUser?.associatedUser).toEqual(updatedTaskData.associatedUser);
        
    });

})