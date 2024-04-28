import todolistCategoryModel from "../schemas/todolistCategory.schemas";
import todolistTaskModel from "../schemas/todolistTask.schemas";
import todolistUserModel from "../schemas/todolistUser.schemas";


class ToDoListService {

    async findAll() {
        const findedTasks = await todolistUserModel.find()
        return findedTasks
    }

    async findById(id: any) {
        const findedTasks = await todolistUserModel.findById(id)
        return findedTasks
    }

    async userCreate(user: any) {
        const createdUser = await todolistUserModel.create(user)
        return createdUser
    }
    async userLogin(name: string, password: string) {
        try {
            const user = await todolistUserModel.findOne({ name, password });
            return user;
        } catch (error) {
            throw new Error('Erro ao buscar usuário');
        }
    }
    async taskCreate(task: any) {
        const camposObrigatorios = ['title', 'description', 'creationDate', 'conclusionDate', 'todoType', 'category', 'todoStatus', 'associatedUser'];

        if (camposObrigatorios.some(campo => task[campo] === undefined || task[campo] === null)) {
            throw new Error('Os campos obrigatórios para criar uma tarefa são: título, descrição, data de criação, tipo de tarefa e status de tarefa.');
        }

        const createdTask = await todolistTaskModel.create(task);
        return createdTask;
    }
    async taskUpdate(id: string, task: any) {
        const updatedTask = await todolistTaskModel.findByIdAndUpdate(id, {
            title: task.title,
            description: task.description,
            creationDate: task.creationDate,
            conclusionDate: task.conclusionDate,
            todoType: task.todoType,
            category: task.category,
            todoStatus: task.todoStatus,
            associatedUser: task.associatedUser,
        }, { new: true })

        return updatedTask
    }

    async taskDelete(id: string) {
        await todolistTaskModel.findByIdAndDelete(id)
        return 'Tarefa removida com sucesso'
    }
}


export default new ToDoListService()