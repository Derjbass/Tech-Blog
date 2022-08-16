const { DataTypes, Model } = require('sequelize');
const User = require('./User');

class Blog extends Model { }

Blog.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    update: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: User,
    //         key: 'id',
    //     }
    // }
}, {
    sequelize: require('../config/db_connection'),
    modelName: 'blogs',
});

User.hasMany(Blog, { foreignKey: "user_id", targetKey: "id" });
Blog.belongsTo(User, { onDelete: 'cascade' });

module.exports = Blog;