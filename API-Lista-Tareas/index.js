const Express = require("express");
const app = Express();
const { Sequelize } = require("sequelize");
const port = 3000;

const TaskModel = require("./Task");
const TaskController = require("./TaskController");
const SchemaValidationMiddleware = require("./SchemaValidation");
const createTaskPayload = require("./createTaskPayload");
const updateTaskPayload = require("./updateTaskPayload");

app.use(Express.json());

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./storage/data.db"
});

TaskModel.initialise(sequelize);

sequelize.sync().then(() => {
    console.log("Sequelize Inicializado!!");

    app.get("/", TaskController.getAllTasks);

    app.get("/:taskId", TaskController.getTaskById);

    app.post(
        "/",
        [SchemaValidationMiddleware.verify(createTaskPayload)],
        TaskController.createTask
    );

    app.patch(
        "/:taskId",
        [SchemaValidationMiddleware.verify(updateTaskPayload)],
        TaskController.updateTask
    );

    app.delete("/:taskId", TaskController.deleteTask);

    app.listen(port, () => {
        console.log("Server Listening on PORT:", port);
    });

}).catch((err) => {
    console.error("Inicialización de Sequelize arrojó un error:", err);
});