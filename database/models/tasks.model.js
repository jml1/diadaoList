module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT('tiny'),
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('fait', 'à faire'),
            allowNull: false
        }
    });

    return Task;
};