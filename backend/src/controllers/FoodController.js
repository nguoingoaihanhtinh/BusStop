import { Op } from "sequelize";
import FoodType from "../models/FoodTypeModel.js";
import Food from "../models/FoodModel.js";


// Get all foods
export const getAllFoods = async (req, res) => {
    try {
      const { page = 1, limit = 10, category = null } = req.query; // Use 'category' instead of 'type' for consistency with API
      const offset = (page - 1) * limit;
  
      let whereClause = {}; // Default: no filter
  
      if (category) {
        // Find FoodType by category name
        const foodType = await FoodType.findOne({ where: { NameType: category } });
        if (!foodType) {
          return res.status(404).json({ error: "Food category not found" });
        }
        whereClause.TypeId = foodType.TypeId; // Ensure we are using the correct column name for the foreign key
      }
  
      // Fetch the foods with pagination and filtering
      const foods = await Food.findAll({
        where: whereClause, // Apply category filter if provided
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        include: [{ model: FoodType, as: "FoodType", attributes: ["NameType"] }],
        order: [["FoodId", "ASC"]], // Adjust this if necessary
      });
  
      // Count the total number of foods after filtering
      const totalFoods = await Food.count({ where: whereClause });
      const totalPages = Math.ceil(totalFoods / limit);
  
      // Return foods with pagination
      res.json({
        status: "success",
        data: foods,
        pagination: {
          currentPage: parseInt(page, 10),
          pageSize: limit,
          totalFoods,
          totalPages,
        },
      });
    } catch (err) {
      console.error("Error fetching foods:", err);
      res.status(500).json({ error: "Failed to fetch foods" });
    }
  };
  

// Get the newest foods
export const getNewestFoods = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const foods = await Food.findAll({
      include: [{ model: FoodType, as: "FoodType", attributes: ["NameType"] }],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [["FoodId", "DESC"]],
    });

    const totalFoods = await Food.count();
    const totalPages = Math.ceil(totalFoods / limit);

    res.json({
      status: "success",
      data: foods,
      pagination: {
        currentPage: parseInt(page, 10),
        pageSize: limit,
        totalFoods,
        totalPages,
      },
    });
  } catch (err) {
    console.error("Error fetching newest foods:", err);
    res.status(500).json({ error: "Failed to fetch newest foods" });
  }
};

// Get a single food item by ID
export const getFoodById = async (req, res) => {
    try {
      const { id } = req.params;  // Change this to req.params instead of req.query
  
      if (!id) {
        return res.status(400).json({ error: "Food ID is required" });
      }
  
      const food = await Food.findOne({
        where: { FoodId: id },  // Ensure you're using the correct column name (FoodId)
        include: [
          { model: FoodType, as: "FoodType", attributes: ["NameType"] },
          // Include additional associations if required
        ],
      });
  
      if (!food) {
        return res.status(404).json({ error: "Food item not found" });
      }
  
      res.json({ status: "success", data: food });
    } catch (err) {
      console.error("Error fetching food:", err);
      res.status(500).json({ error: "Failed to fetch food" });
    }
  };
  

// Add a new food item
export const addFood = async (req, res) => {
  try {
    const { Name, Image1, Image2, Image3, Description, TypeId, Price, Itemleft } = req.body;

    const newFood = await Food.create({
      Name,
      Image1,
      Image2,
      Image3,
      Description,
      TypeId,
      Price,
      Itemleft,
    });

    res.json({ status: "success", data: newFood });
  } catch (err) {
    console.error("Error adding food:", err);
    res.status(500).json({ error: "Failed to add food" });
  }
};

// Update a food item
export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Image1, Image2, Image3, Description, TypeId, Price, Itemleft } = req.body;

    const food = await Food.findByPk(id);

    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    food.Name = Name;
    food.Image1 = Image1;
    food.Image2 = Image2;
    food.Image3 = Image3;
    food.Description = Description;
    food.TypeId = TypeId;
    food.Price = Price;
    food.Itemleft = Itemleft;

    await food.save();

    res.json({ status: "success", data: food });
  } catch (err) {
    console.error("Error updating food:", err);
    res.status(500).json({ error: "Failed to update food" });
  }
};

// Delete a food item
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findByPk(id);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    await food.destroy();
    res.json({ status: "success", message: "Food deleted successfully" });
  } catch (err) {
    console.error("Error deleting food:", err);
    res.status(500).json({ error: "Failed to delete food" });
  }
};
