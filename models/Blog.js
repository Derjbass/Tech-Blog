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
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    }
}, {
    sequelize: require('../config/db_connection'),
    modelName: 'blogs',
});

Blog.hasOne(User);
User.hasMany(Blog);

module.exports = Blog;