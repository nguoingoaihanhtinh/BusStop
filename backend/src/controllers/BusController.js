import Bus from '../models/BusModel.js';
import Ticket from '../models/TicketModel.js';
import Seat from '../models/SeatModel.js';

// Get all buses
export const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.findAll({
      include: [
        {
          model: Ticket,
          attributes: ['departure', 'destination', 'startTime', 'arrivalTime', 'price'],
        },
      ],
    });
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching buses', details: err.message });
  }
};


