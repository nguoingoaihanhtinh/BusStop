import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './UserModel.js';
import Food from './FoodModel.js';


const UserFoodOrder = sequelize.define('UserFoodOrder', {
  OrderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'UserId',
    },
  },
  FoodId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Food,
      key: 'FoodId',
    },
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'UserFoodOrders',
  timestamps: false,
});

export default UserFoodOrder;
