import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';



const FoodType = sequelize.define('FoodType', {
  TypeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  NameType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ParentId: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
}, {
  tableName: 'FoodTypes', // Name of the table in the database
  timestamps: false,      // Disable createdAt and updatedAt fields
});


export default FoodType;
