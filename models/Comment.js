const { DataTypes, Model } = require('sequelize');
const Blog = require('./Blog');

class Comment extends Model { }

Comment.init({
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Blog,
            key: 'user_id'
        }
    }
}, {
    sequelize: require('../config/db_connection'),
    modelName: 'comments',
});

Blog.hasMany(Comment, { foreignKey: "blog_id", targetKey: "id" });
Comment.belongsTo(Blog, { onDelete: 'cascade' });

module.exports = Comment;