import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen flex items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
