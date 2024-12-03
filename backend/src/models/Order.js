import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const Order = sequelize.define('Order', {
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
  TicketId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ticket,
      key: 'TicketId',
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
  CreatedAt:
  {
    type: DataTypes.DATE,
    allowNull: false,
  }

}, {
  tableName: 'ticketorder',
  timestamps: false,
});
import User from './UserModel.js';
import Ticket from './TicketModel.js';
// Define the associations directly in the model file
Order.belongsTo(User, { foreignKey: 'UserId' });
Order.belongsTo(Ticket, { foreignKey: 'TicketId' });
Ticket.hasMany(Order, { foreignKey: 'TicketId' });
// Set up associations after defining the model
User.hasMany(Order, { foreignKey: 'UserId' });

export default Order;
