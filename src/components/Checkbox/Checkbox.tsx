"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface ICheckboxProp {
  isChecked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  notAllowed?: boolean;
}

export const Checkbox = ({
  isChecked: isCheckedProp,
  onChange,
  label,
  disabled,
  notAllowed,
}: ICheckboxProp) => {
  const ref = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(isCheckedProp);
  const [isDisabled, setIsDisabled] = useState(disabled);

  useEffect(() => {
    if (notAllowed) {
      setIsDisabled(true);
      setIsChecked(true);
    }
  }, [notAllowed]);

  useEffect(() => {
    if (isDisabled) setIsFocused(false);
  }, [isDisabled]);

  function handleOnChange() {
    onChange(isChecked);
  }

  function handleOnClick() {
    if (!isDisabled) {
      setIsChecked(!isChecked);
    }
  }

  useEffect(handleOnChange, [isChecked, onChange]);

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={isDisabled}
        className={`flex items-center justify-center w-4 h-4 rounded border border-solid outline-primary/20 outline-4 outline-opacity-20
            ${
              isChecked
                ? "bg-primary border-primary"
                : "border-gray-ctr-3 hover:bg-primary-50 hover:border-primary"
            }
            ${isFocused ? "outline border-primary" : ""}
            ${
              isChecked && isDisabled
                ? "!bg-gray-ctr-3 !border-gray-ctr-3 opacity-20"
                : isDisabled
                ? "border-gray-ctr-3 opacity-20"
                : ""
            }`}
        ref={ref}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClick={handleOnClick}
      >
        {notAllowed && (
          <Image alt="" src="\icons\rectangle.svg" width={8} height={2} />
        )}
        {isChecked && !notAllowed && (
          <Image alt="" src="\icons\checked.svg" width={8} height={6} />
        )}
      </button>
      {!!label && (
        <label
          htmlFor={label}
          onClick={handleOnClick}
          className="text-sm font-normal text-gray-ctr-4 cursor-pointer"
        >
          {label}
        </label>
      )}
      <input
        type="checkbox"
        id={label}
        checked={isChecked}
        disabled={isDisabled}
        className="hidden"
      />
    </div>
  );
};
