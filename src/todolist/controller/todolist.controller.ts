import { Request, Response } from 'express'
import todolistService from '../service/todolist.service';
import todolistCategorySchemas from '../schemas/todolistCategory.schemas';
import todolistUserSchemas from '../schemas/todolistUser.schemas';

class ToDoListController {

    async findAll(req: Request, res: Response) {
        const findedTasks = await todolistService.findAll()

        return res.json(findedTasks)
    }

    async findById(req: Request, res: Response) {
        const findedTasks = await todolistService.findById(req.params.id)

        return res.json(findedTasks)
    }

    async userCreate(req: Request, res: Response) {
        try {
            const newUser = await todolistService.userCreate(req.body)
            res.status(201)
            return res.json(newUser)
        }
        catch (error) {
            return res.json({
                status: res.status(500),
                error: error
            })
        }
    }

    async userLogin(req: Request, res: Response) {
        const { name, password } = req.body;
        try {
            const user = await todolistService.userLogin(name, password);
            if (user) {
                return res.status(200).json({ message: 'Login bem-sucedido', user });
            } else {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao fazer login', error: (error as Error).message });
        }
    }

    async taskCreate(req: Request, res: Response) {
        try {
            const newTask = await todolistService.taskCreate(req.body)
            res.status(201)
            return res.json(newTask)
        }
        catch (error) {
            return res.json({
                status: res.status(500),
                error: error
            })
        }
    }

    async taskUpdate(req: Request, res: Response) {
        const updatedTask = await todolistService.taskUpdate(req.params.id, req.body)
        return res.json(updatedTask)
    }

    async taskDelete(req: Request, res: Response) {
        const deleteTask = await todolistService.taskDelete(req.params.id)
        return res.json(deleteTask)
    }

    
}


export default new ToDoListController()