"use client"
import React, { useState } from "react";
import { ReadCvLogo, EnvelopeSimple, Question, LockSimple, EyeSlash } from "@phosphor-icons/react";
import { Button } from "@/components/Button/Button";
import { InputText } from "@/components/InputText/InputText";


export default function Home() {

  // let inputValue = "";
  const [inputEmailValue, setInputEmailValue] = useState("");

  function textEmailInput(value: string) {
    //inputValue += value;
    setInputEmailValue(value);
  }

  const [inputPasswordValue, setInputPasswodValue] = useState("");

  function textPasswodInput(value: string) {
    setInputPasswodValue(value);
  }

  return (
    <main className="flex min-h-screen px-5 py-16 text-2xl font-bold flex-col">
        <div className="flex items-center gap-px mb-11">
          <ReadCvLogo size={34.5 | 40} className="fill-primary-dark rotate-12"/>
          <h1 className="text-gray-ctr-4 text-2xl">Ava</h1>
        </div>
        <h1 className="text-3xl leading-9 text-gray-ctr-4 font-bold mb-8">
          Olá, <br />Bem vindo!
        </h1>
        <div className="flex flex-col gap-5 mb-5">
          <InputText onChange={textEmailInput}
          value={inputEmailValue} 
          startIcon={<EnvelopeSimple size={20} />} 
          placeholder="E-mail"
          endIcon={<Question size={20} />}          
          fullWidth={true}
          />
          <InputText fullWidth={true}
          onChange={textPasswodInput}
          value={inputPasswordValue}
          type="password"
          startIcon={<LockSimple size={20} />}
          placeholder="Senha"
          endIcon={<EyeSlash size={20} />}
          />
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <label className="text-sm font-normal text-gray-ctr-4">Lembrar senha</label> {/*Label seria a tag correta aqui? */}
            </div>
            <a href="#" className="text-sm font-bold text-primary">Esqueceu a senha?</a>
          </div>
        </div>
        <Button>Entrar</Button>
    </main>
  )
}
