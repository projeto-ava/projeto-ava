'use client'

import { InputText } from '@/components/InputText/InputText'
import { Button } from '@/components/Button/Button'
import ThemeSwitcher from '@/components/ThemeSwitch/ThemeSwitch'
import { CloudFog, Eye, EyeClosed, LockSimple } from '@phosphor-icons/react'
import { PasswordTest } from '@/components/PasswordTest/PasswordTest'
import { useEffect, useState } from 'react'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { usePathname } from 'next/navigation'
import axios from 'axios'

export default function ChangePassword() {
  const router = usePathname()

  const [inputValue, setInputValue] = useState<string>('')
  const [inputPasswordValue, setInputPasswordValue] = useState<string>('')
  const [visiblePassword, setVisiblePassword] = useState<boolean>(true)
  const [visiblePasswordConfirm, setVisiblePasswordConfirm] =
    useState<boolean>(true)
  const [useEmail, setUserEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [inputPasswordValueError, setInputPasswordValueError] =
    useState<string>('')
  const [inputValueError, setInputValueError] = useState<string>('')

  const changePassword = () => {
    if (inputPasswordValueError || inputValueError || !inputValue) return
    setIsLoading(true)
    axios
      .put('http://localhost:3000/user-rest-api/update-password', {
        email: useEmail,
        password: inputValue
      })
      .then(() => {
        alert('Senha alterada')
      })
      .catch(() => {
        alert('Falha ao alterar a senha')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (inputValue != inputPasswordValue && inputValue && inputPasswordValue) {
      setInputPasswordValueError('Senha incompatível')
    } else if (!inputValue && !inputPasswordValue) {
      setInputPasswordValueError('')
    } else if (!inputPasswordValue) {
      setInputPasswordValueError('Campo obrigatório')
    } else {
      setInputPasswordValueError('')
    }
  }, [inputValue, inputPasswordValue])

  useEffect(() => {
    if (inputValue && inputValue.length < 4) {
      setInputValueError('Mínimo de 4 caracteres')
    } else {
      setInputValueError('')
    }
  }, [inputValue])

  useEffect(() => {
    const routeParam = router.split('/')
    setUserEmail(routeParam[routeParam.length - 1])
  }, [])

  return (
    <PageWrapper
      publicArea={{
        image: '/key.svg',
        alt: '',
        title: 'Defina sua senha',
        subTitle: 'Sua nova senha deve ser diferente da anterior'
      }}
    >
      <>
        <InputText
          errorText={inputValueError}
          type={visiblePassword ? 'password' : 'text'}
          fullWidth={true}
          disabled={false}
          placeholder="Digite sua nova senha"
          label="Nova senha"
          value={inputValue}
          onChange={value => setInputValue(value)}
          startIcon={<LockSimple size={16} />}
          endIcon={
            visiblePassword ? (
              <EyeClosed
                size={16}
                onClick={() => setVisiblePassword(!visiblePassword)}
              />
            ) : (
              <Eye
                size={16}
                onClick={() => setVisiblePassword(!visiblePassword)}
              />
            )
          }
        />
        <InputText
          errorText={inputPasswordValueError}
          type={visiblePasswordConfirm ? 'password' : 'text'}
          placeholder="Confirme a nova senha"
          label="Confirmar nova senha"
          fullWidth={true}
          value={inputPasswordValue}
          onChange={value => setInputPasswordValue(value)}
          startIcon={<LockSimple size={16} />}
          endIcon={
            visiblePasswordConfirm ? (
              <EyeClosed
                size={16}
                onClick={() =>
                  setVisiblePasswordConfirm(!visiblePasswordConfirm)
                }
              />
            ) : (
              <Eye
                size={16}
                onClick={() =>
                  setVisiblePasswordConfirm(!visiblePasswordConfirm)
                }
              />
            )
          }
        />
        <PasswordTest password={inputValue} />
        <Button disabled={isLoading} onClick={changePassword}>
          {isLoading ? 'Enviando' : 'Confirmar'}
        </Button>
      </>
    </PageWrapper>
  )
}
