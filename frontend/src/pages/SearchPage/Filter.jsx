import React, { useState } from "react";
import RangeSlider from "../../components/ui/Slider";
import { Button, Checkbox } from "antd";

const types = [
  { id: 1, name: "Economy" },
  { id: 2, name: "Standard" },
  { id: 3, name: "Luxury" },
  { id: 4, name: "VIP" },
];

const models = [
  { id: 1, name: "Hyundai Universe" },
  { id: 2, name: "Toyota Coaster" },
  { id: 3, name: "Audi" },
  { id: 4, name: "Mercedes Benz" },
  { id: 5, name: "Thaco TB85" },
];

const Filter = ({ onFilterChange }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 3500000]);

  const handleTypeChange = (typeId) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleModelChange = (modelId) => {
    setSelectedModels((prev) =>
      prev.includes(modelId)
        ? prev.filter((id) => id !== modelId)
        : [...prev, modelId]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      types: selectedTypes,
      models: selectedModels,
      price: priceRange,
    });
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedModels([]);
    setPriceRange([0, 3500000]);
    onFilterChange({ types: [], models: [], price: [0, 3500000] });
  };
 
  return (
    <div className="p-5 flex flex-col gap-[20px] rounded-[20px] shadow-lg text-black">
      <RangeSlider onPriceChange={setPriceRange} />

      {/* Type Filter */}
      <div className="flex flex-col gap-[10px]">
        <label className="font-semibold">Type</label>
        {types.map((type) => (
          <div key={type.id} className="flex items-center gap-[10px]">
            <Checkbox
              checked={selectedTypes.includes(type.id)}
              onChange={() => handleTypeChange(type.id)}
            />
            <label>{type.name}</label>
          </div>
        ))}
      </div>

      {/* Model Filter */}
      <div className="flex flex-col gap-[10px]">
        <label className="font-semibold">Model</label>
        {models.map((model) => (
          <div key={model.id} className="flex items-center gap-[10px]">
            <Checkbox
              checked={selectedModels.includes(model.id)}
              onChange={() => handleModelChange(model.id)}
            />
            <label>{model.name}</label>
          </div>
        ))}
      </div>

      {/* Apply and Reset Buttons */}
      <div className="flex gap-[10px]">
        <Button onClick={applyFilters}>Apply</Button>
        <Button onClick={resetFilters} type="default">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Filter;
