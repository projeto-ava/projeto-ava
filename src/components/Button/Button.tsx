"use client"

import React from "react";

interface IButtonProp {
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
  fullWidth?: boolean;
}

export const Button = ({ disabled, children, onClick, fullWidth }: IButtonProp) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2.5 text-white rounded focus:outline outline-primary/20 outline-4 bg-blue-500 hover:bg-primary-dark disabled:text-gray-500 disabled:bg-gray-500/20 ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </button>
  )
}
