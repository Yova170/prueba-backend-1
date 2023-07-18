const { DataTypes } = require("sequelize");

const TaskModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
};

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("task", TaskModel);
    },

    createTask: (task) => {
        return this.model.create(task);
    },

    findTask: (query) => {
        return this.model.findOne({
            where: query
        });
    },

    updateTask: (query, updatedValue) => {
        return this.model.update(updatedValue, {
            where: query
        });
    },

    findAllTasks: (query) => {
        return this.model.findAll({
            where: query
        });
    },

    deleteTask: (query) => {
        return this.model.destroy({
            where: query
        });
    }
};