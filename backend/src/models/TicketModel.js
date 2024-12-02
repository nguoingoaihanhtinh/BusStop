import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Bus from './BusModel.js';




const Ticket = sequelize.define('Ticket', {
    TicketId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  BusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Bus,
      key: 'BusId',
    },
  },

  departure: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE, // Consider using a more specific data type if needed (e.g., DATETIME)
    allowNull: false,
  },
  arrivalTime:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  seatleft: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
    allowNull: false,
  }
}, {
  tableName: 'Ticket', // Name of the table in the database
  timestamps: false,  // Disable createdAt and updatedAt fields
});



export default Bus;
