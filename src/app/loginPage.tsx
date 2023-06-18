import React from "react";
import Image from 'next/image'
import { emailInput } from "@/components/Input/emailInput";
import { passwordInput } from "@/components/Input/passwordInput";
import { checkboxInput } from "@/components/Input/checkboxInput";
import { Button } from "@/components/Button/Button";


export default function Home() {
  return (
    <main className="flex min-h-screen px-5 py-16 text-2xl font-bold flex-col bg-slate-50">
        <div className="flex items-center gap-px mb-11">
          <Image src="/icons/notes_icon.svg" width={34.55} height={40} alt=""></Image>
          <h1 className="">AVA</h1>
        </div>
        <h1 className="text-3xl font-bold mb-8">
          Olá, <br />Bem vindo!
        </h1>
        <div className="flex flex-col gap-6 mb-8">
          {emailInput({ placeholder: 'E-mail', fullWidth: true})}
          {passwordInput({ placeholder: 'Senha', fullWidth: true})}
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              {checkboxInput()}
              <label className="text-sm font-normal text-gray-900">Lembrar senha</label>
            </div>
            <a href="#" className="text-sm font-bold text-blue-500">Esqueceu a senha?</a>
          </div>
        </div>
        <Button>Entrar</Button>
    </main>
  )
}
