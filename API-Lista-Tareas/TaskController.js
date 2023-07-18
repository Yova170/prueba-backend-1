const TaskModel = require("./Task");

module.exports = {
    getAllTasks: (req, res) => {
        const { query: filters} = req;

        TaskModel.findAllTasks(filters).then((tasks) => {
            return res.status(200).json({
                status: true,
                data: tasks,
            });
        }).catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },

    getTaskById: (req, res) => {
        const { params: { taskId } } = req;

        TaskModel.findTask({ id: taskId }).then((task) => {
            return res.status(200).json({
                status: true,
                data: task.toJSON(),
            });
        }).catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    
    createTask: (req, res) => {
        const { body } = req;

        TaskModel.createTask(body).then((task) => {
            return res.status(200).json({
                status: true,
                data: task.toJSON(),
            });
        }).catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },

    updateTask: (req, res) => {
        const {
            params: { taskId },
            body: payload,
        } = req;

        if (!Object.keys(payload).length) {
            return res.status(400).json({
                status: false,
                error: {
                    message: "Body está vacío, por lo tanto no se puede actualizar la tarea.",
                },
            });
        }

        TaskModel.updateTask({ id: taskId }, payload).then(() => {
            return TaskModel.findTask({ id: taskId });
        }).then((task) => {
            return res.status(200).json({
                status: true,
                data: task.toJSON(),
            });
        }).catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    
    deleteTask: (req, res) => {
        const { params: { taskId }, } = req;

        TaskModel.deleteTask({ id: taskId }).then((numberOfEntriesDeleted) => {
            return res.status(200).json({
                status: true,
                data: {
                    numberOfTasksDeleted: numberOfEntriesDeleted
                },
            });
        }).catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }
}