import React from "react";
import Image from "next/image";


interface IEmailInputProp {
    placeholder: string;
    helpIcon?: boolean;
    fullWidth?: boolean;
}

export const emailInput = ({ placeholder, fullWidth, helpIcon }:IEmailInputProp) => {
    return (
        <div className="flex justify-start items-center relative gap-2.5">
            <Image className="absolute ml-2.5" src="/icons/email_icon.svg" alt="" width={16.25} height={12.5}></Image>
            <input 
                type="email"
                placeholder={placeholder}
                className={`py-2.5 pl-9 pr-2.5 gap-2 border border-solid rounded border-gray-400 bg-transparent text-base font-normal text-gray-400 ${fullWidth ? 'w-full' : ''}`}
            >
            </input>
        </div>

    )
}