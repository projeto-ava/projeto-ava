"use client"

import React, { useState } from "react"

export const CheckboxComponent = () => {

    const [isChecked, setIsChecked] = useState(false)

    function checkPress() {
        setIsChecked(!isChecked)
        return isChecked
    }

    return (
        <>
            <button className={`w-4 h-4 rounded border border-solid border-gray-ctr-3
            ${isChecked ? 'bg-primary border-primary' : ''}}`}
            onClick={checkPress}>

            </button>
            <input type="checkbox" id="checkbox" checked={isChecked} onChange={checkPress} 
            className="hidden"/>
        </>
    )
}