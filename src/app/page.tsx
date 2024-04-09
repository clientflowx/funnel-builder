"use client"
import React, { useState } from 'react';
import SideBar from "@/components/sidebar";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("Clientflowx");

  const handleOptionChange = (selectedOption: string) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div>
      <SideBar handleOptionChange={handleOptionChange} />
      <div className='p-80'>{selectedOption}</div>
    </div>
  );
};

export default Page;
