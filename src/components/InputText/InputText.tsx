'use client'

import React, { useEffect, useRef, useState } from 'react'

interface IInputTextProp {
  disabled?: boolean
  fullWidth?: boolean
  onChange: (value: string) => void
  value: string
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  label?: string
  errorText?: string
  placeholder?: string
  type?: 'password' | 'text'
  className?: string
}

export const InputText = ({
  disabled,
  onChange,
  fullWidth,
  value,
  startIcon,
  endIcon,
  label,
  errorText,
  placeholder,
  type,
  className
}: IInputTextProp) => {
  const ref = useRef(null)

  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (disabled) setIsFocused(false)
  }, [disabled])

  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          className={`text-xs ${
            isFocused ? 'text-primary' : 'text-gray-ctr-3'
          }`}
        >
          {label}
        </label>
      )}
      <div
        className={`${
          className || ''
        } [&>svg]:w-5 [&>svg]:h-5 outline-primary/20 outline-4 outline-opacity-20 flex gap-2 px-2 items-center h-11 w-fit rounded border border-solid  ${
          fullWidth ? 'w-full' : ''
        } ${
          isFocused
            ? 'outline border-primary [&>svg]:fill-primary'
            : 'border-gray-ctr-3 [&>svg]:fill-gray-ctr-3'
        } ${disabled ? 'bg-gray-ctr-2 [&>svg]:fill-gray-ctr-3' : ''} `}
      >
        <>
          {startIcon}
          <input
            className="w-full outline-none bg-transparent text-gray-ctr-4 placeholder-gray-ctr-3"
            type={type || 'text'}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            onChange={value => onChange(value.target.value)}
            value={value}
            disabled={disabled}
          />
          {endIcon}
        </>
      </div>
      {errorText && <p className="text-red-500 text-xs ">{errorText}</p>}
    </div>
  )
}
