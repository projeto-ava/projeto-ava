import React from "react";
import Image from "next/image";


interface IpasswordInputProp {
    placeholder: string;
    visiblePassword?: boolean;
    onClick?: () => void; /* Deixar obrigatório depois */
    fullWidth?: boolean;
}

export const passwordInput = ({ placeholder, fullWidth, visiblePassword=false, onClick }:IpasswordInputProp) => {
    return (
        <div className="flex justify-start items-center relative gap-2.5">
            <Image className="absolute ml-2.5" src="/icons/locked_icon.svg" alt="" width={16.25} height={12.5}></Image>
            <input 
                type="password"
                placeholder={placeholder}
                className={`py-2.5 px-9 gap-2 border border-solid rounded border-gray-400 bg-transparent text-base font-normal text-gray-400 ${fullWidth ? 'w-full' : ''}`}
            >
            </input>
            <button className="absolute right-2.5" onClick={onClick}>
                <Image src="/icons/invisible_icon.svg" alt="" width={18.75} height={15}></Image>
            </button>
        </div>
    )
}