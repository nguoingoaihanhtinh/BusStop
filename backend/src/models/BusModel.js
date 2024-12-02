import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const Bus = sequelize.define('Bus', {
  BusId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  busType: {
    type: DataTypes.STRING,
  },
  busModel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seatType: {
    type: DataTypes.STRING,
  },
  seatCapacity: {
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
  }
}, {
  tableName: 'Bus', // Name of the table in the database
  timestamps: false,  // Disable createdAt and updatedAt fields
});

export default Bus;
