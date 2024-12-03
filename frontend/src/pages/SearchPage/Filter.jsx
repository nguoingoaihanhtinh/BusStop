import Rating from '@/components/Rating/Rating'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import RangeSlider from '@/components/ui/slider'
import { useGetCategoriesQuery } from '@/store/rtk/course.services'
import { ChevronDown, Sliders, SlidersHorizontal } from 'lucide-react'
import React, { useState } from 'react'
const types = [
    {id:1, name: "AC deluxe"},{id:2, name: "Tourist AC"},{id:3, name: "Air suspension"},{id:4, name: "Tourist standard"}
];
const models = [
    { id: 1, name: "Volkswagen"},      // Duration in hours: 0-1
    { id: 2, name: "Mercedes"},      // Duration in hours: 1-3
    { id: 3, name: "Audi"},      // Duration in hours: 3-6
    { id: 4, name: "Honda"},    // Duration in hours: 6-17
    { id: 5, name: "McLauren" } // Duration greater than 17 hours
  ];
  
  const Filter = ({ onFilterChange }) => {  
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 3500000]); 
    const { data, error, isLoading } = useGetCategoriesQuery();
    // console.log("Categories Data:", categories)
    // Handle rating change (filter by rating >= selected)
    const handleModelChange = (model) => {
      setSelectedModels((prev) =>
        prev.includes(model) ? prev.filter((r) => r !== model) : [...prev, model]
      );
    };
  
    // Handle level selection
    const handleTypeChange = (type) => {
      selectedTypes((prev) =>
        prev.includes(type) ? prev.filter((id) => id !== type) : [...prev, type]
      );
    };
      
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev); 
      };
  
    // Apply filters and pass them to the parent
    const applyFilters = () => {
      const filters = {
        models: selectedModels,
        types: selectedTypes,
        price: priceRange,
      };
      onFilterChange(filters); // Passing the selected filters back to parent component
    };
    const resetFilters = () => {
        setSelectedTypes([]);
        setSelectedModels([]);
        setPriceRange([0, 3500000]);
        onFilterChange({ types: [], models: [], price: [0, 3500000] });
    };
  
    return (
      <div className="p-5 flex flex-col gap-[20px] rounded-[20px] shadow-lg">
        {/* RangeSlider component can be customized for other filters */}
        <RangeSlider  onPriceChange={setPriceRange}/>
  
        {/* Type Filter */}
        <div className="level flex flex-col gap-[10px]">
          <label className="text-text/md/semibold font-worksans">Loại</label>
          <div className="lvList flex flex-col gap-[10px]">
            {types.map((type) => (
              <div key={type.id} className="flex items-center gap-[10px]">
                <Checkbox
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={() => handleTypeChange(type.id)}
                  id={`type-${type.id}`}
                  className="cursor-pointer rounded-[2px]"
                />
                <label htmlFor={`type-${type.id}`} className="cursor-pointer text-text/sm/regular">
                  {type.name}
                </label>
              </div>
            ))}
          </div>
        </div>
         {/* Model Filter */}
         <div className="level flex flex-col gap-[10px]">
          <label className="text-text/md/semibold font-worksans">Loại</label>
          <div className="lvList flex flex-col gap-[10px]">
            {models.map((model) => (
              <div key={model.id} className="flex items-center gap-[10px]">
                <Checkbox
                  checked={selectedModels.includes(model.id)}
                  onCheckedChange={() => handleModelChange(model.id)}
                  id={`model-${model.id}`}
                  className="cursor-pointer rounded-[2px]"
                />
                <label htmlFor={`model-${model.id}`} className="cursor-pointer text-text/sm/regular">
                  {model.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* Apply and Reset Buttons */}
        <div className="buttons flex gap-[10px] justify-between">
          <Button className="px-4 py-3 w-[164px]" onClick={applyFilters}>
            Áp dụng
          </Button>
          <Button className="px-4 py-3 w-[164px]" variant="outline" onClick={resetFilters}>
            Đặt lại
          </Button>
        </div>
      </div>
    );
  };
  
  export default Filter;


