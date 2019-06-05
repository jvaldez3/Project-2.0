module.exports = function (sequelize, DataTypes) {
    var Quizzes = sequelize.define("Quizzes", {
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age_range: {
            type: DataTypes.STRING,
            allowNull: false
        },

        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        miles: {
            type: DataTypes.STRING,
            allowNull: false
        },
        group_size: {
            type: DataTypes.STRING,
            allowNull: false
        },
        competitive: {
            type: DataTypes.STRING,
            allowNull: false
        },
        electric: {
            type: DataTypes.STRING,
            allowNull: false
        },
        matching: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shopping: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weather: {
            type: DataTypes.STRING,
            allowNull: false
        },



    });
    return Quizzes;
};