import React, { useState } from 'react';
import { FaFilter } from "react-icons/fa";
interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
}


const CustomSelect: React.FC<CustomSelectProps> = ({ options, onChange, placeholder = 'Filtrar...' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full">
      <div className="bg-nd h-12 flex items-center justify-between border rounded-lg p-2 cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}>
        <h1>
            {selectedOption ? selectedOption.label : placeholder}
        </h1>
        <h1 className='text-xl text-card-bg'>
            <FaFilter />
        </h1>
      </div>
      {isOpen && (
        <ul className="absolute z-10 top-[98%] sm:top-[102%] w-full bg-nd border rounded-lg overflow-hidden">
          {options.map((option) => (
            <li
              key={option.value}
              className="p-2 group hover:bg-interaction cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              <h3 className='group-hover:font-bold duration-300 text-sm'>
                {option.label}
              </h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
