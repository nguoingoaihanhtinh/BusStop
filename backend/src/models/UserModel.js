import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  UserId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Users', // Name of the table in the database
  timestamps: false,  // Disable createdAt and updatedAt fields
});

export default User;
