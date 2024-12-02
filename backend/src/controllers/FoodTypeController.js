import FoodType from '../models/FoodTypeModel.js'; // Assuming you have this model
import Food from '../models/FoodModel.js'; // Assuming you have a Food model

export const getAllFoodTypes = async (req, res) => {
  try {
    // Fetch the food types without pagination
    const foodTypes = await FoodType.findAll({
      attributes: ['TypeId', 'NameType', 'ParentId'],
      raw: true, // Return raw data (no instance methods)
    });

    return res.json({
      status: 'success',
      data: foodTypes,
    });
  } catch (err) {
    console.error('Error fetching food types:', err);
    return res.status(500).json({ error: 'Failed to fetch food types' });
  }
};

export const getFoodTypeById = async (req, res) => {
    const { id } = req.params; // Get the id from the route params
  
    try {
      // Find the food type by ID
      const foodType = await FoodType.findOne({
        where: { TypeId: id },
        attributes: ['TypeId', 'NameType'], // Select only the necessary fields
      });
  
      if (!foodType) {
        return res.status(404).json({
          status: 'error',
          message: 'Food type not found',
        });
      }
  
      return res.json({
        status: 'success',
        data: foodType,
      });
    } catch (err) {
      console.error('Error fetching food type by ID:', err);
      return res.status(500).json({
        error: 'An error occurred: ' + err.message,
      });
    }
  };
