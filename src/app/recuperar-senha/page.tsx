'use client'

import { InputText } from '@/components/InputText/InputText'
import { Button } from '@/components/Button/Button'
import ThemeSwitcher from '@/components/ThemeSwitch/ThemeSwitch'
import { EnvelopeSimple, Question } from '@phosphor-icons/react'
import { PasswordTest } from '@/components/PasswordTest/PasswordTest'
import { useState } from 'react'
import { GenericWrapper } from '@/components/GenericWrapper/GenericWrapper'

// ...outro código do seu arquivo...

export default function RedefinePassword() {
  const [inputValue, setInputValue] = useState<string>('')

  return (
    <GenericWrapper
      Public={{
        image: '/icon.svg',
        alt: '',
        title: 'Defina sua senha',
        subTitle: 'Sua nova senha deve ser diferente da anterior'
      }}
    >
      <>
        <ThemeSwitcher />

        <InputText
          fullWidth={true}
          disabled={false}
          placeholder="Digite a nova senha"
          label="Label"
          value={inputValue}
          onChange={value => setInputValue(value)}
          startIcon={<EnvelopeSimple size={16} />}
          endIcon={<Question size={16} />}
        />
        <InputText
          placeholder="Confirme a nova senha"
          label="Label"
          fullWidth={true}
          value={inputValue}
          onChange={value => setInputValue(value)}
          startIcon={<EnvelopeSimple size={16} />}
          endIcon={<Question size={16} />}
        />
        <PasswordTest password={inputValue} />
        <Button
          onClick={() => {
            alert('teste')
          }}
        >
          Confirmar
        </Button>
      </>
    </GenericWrapper>
  )
}
