"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  options: { value: string; header: string }[];
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar: React.FC<Props> = ({ options, setSelectedOption }) => {
  const pathname = usePathname();
  const [userSelectedOption, setUserSelectedOption] = useState(
    options[0].value
  );
  useEffect(() => {
    const lastPathSegment = pathname.split("/").filter(Boolean).pop() || "";
    setUserSelectedOption(lastPathSegment);
  }, [pathname]);

  const handleOptionClick = (option: string) => {
    setUserSelectedOption(option);
    setSelectedOption(option);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-start gap-3">
        {options.map((option, index) => (
          <div className="flex flex-col" key={index}>
            <div
              className={`text-xs font-medium cursor-pointer ${
                option.value === userSelectedOption ? "text-blue-500" : ""
              } transition-all`}
              key={index}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.header}
            </div>
            <div
              className={`${
                option.value === userSelectedOption ? "bg-blue-500" : ""
              } mt-1 h-[2px] transition-all`}
            ></div>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
