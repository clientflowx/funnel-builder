"use client"
import React, { useState } from 'react';
import SideBar from "@/components/sidebar";
import Navbar from '@/components/navbar';

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("Clientflowx");

  const handleOptionChange = (selectedOption: string) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div className='flex h-screen flex-col justify-between overflow-x-hidden'>
      <Navbar />
      <div className='w-full pt-14'>
        <SideBar handleOptionChange={handleOptionChange} />
        <div className='pl-56 pt-4'>{selectedOption}</div>
      </div>
    </div>
  );
};

export default Page;
