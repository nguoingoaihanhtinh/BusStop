import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Define Ticket model first
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
      model: 'Bus', // Use the table name as a string reference
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
    type: DataTypes.DATE,
    allowNull: false,
  },
  arrivalTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  seatleft: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
}, {
  tableName: 'ticket',
  timestamps: false,
});

// Import Bus after both models are defined
import Bus from './BusModel.js';

// Define the association after the models are defined
Ticket.belongsTo(Bus, { foreignKey: 'BusId' });  // Define the reverse relationship
Bus.hasMany(Ticket, { foreignKey: 'BusId' });


export default Ticket;
