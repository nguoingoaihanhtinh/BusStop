import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Order from './Order.js';


const Seat = sequelize.define('Seat', {
  SeatId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  OrderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'OrderId',
    },
  },
  SeatNumber: {
    type: DataTypes.STRING, // Format can be 'A1', 'B2', etc.
    allowNull: false,
  },
}, {
  tableName: 'Seat',
  timestamps: false,
});
Order.hasMany(Seat, { foreignKey: 'OrderId' });
Seat.belongsTo(Order, { foreignKey: 'OrderId' });
export default Seat;
