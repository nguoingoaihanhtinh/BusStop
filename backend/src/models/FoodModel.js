import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import FoodType from './FoodTypeModel.js';



const Food = sequelize.define('Food', {
  FoodId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Image1: {
    type: DataTypes.STRING,
  },
  Image2: {
    type: DataTypes.STRING,
  },
  Image3: {
    type: DataTypes.STRING,
  },
  Description: {
    type: DataTypes.TEXT,
  },
  TypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.0,
  },
  NumberRating: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  Price: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  Itemleft: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'Foods', // Name of the table in the database
  timestamps: false,  // Disable createdAt and updatedAt fields
});


// Define the association
Food.belongsTo(FoodType, {
  foreignKey: 'TypeId',
  as: 'FoodType',
});
FoodType.hasMany(Food, {
    foreignKey: 'TypeId',  // Foreign key in the Food table
    as: 'foods',           // Alias for the relation
  });
export default Food;
