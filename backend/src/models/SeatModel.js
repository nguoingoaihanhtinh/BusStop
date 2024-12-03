import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Ticket from './TicketModel.js';

const Seat = sequelize.define('Seat', {
  SeatId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  TicketId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ticket,
      key: 'TicketId',
    },
  },
  SeatNumber: {
    type: DataTypes.STRING, // Format can be 'A1', 'B2', etc.
    allowNull: false,
  },
  Status: {
    type: DataTypes.ENUM('available', 'reserved', 'occupied'),
    defaultValue: 'available',
  },
}, {
  tableName: 'Seat',
  timestamps: false,
});
Ticket.hasMany(Seat, { foreignKey: 'TicketId' });
Seat.belongsTo(Ticket, { foreignKey: 'TicketId' });
export default Seat;
