import { CheckCircle, Info } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

interface IPasswordTestProp {
  password: string
}

export const PasswordTest = ({ password }: IPasswordTestProp) : JSX.Element => {
  const [hasNumber, setHasNumber] = useState<boolean>(false)
  const [hasUppercaseAndLowercase, setHasUppercaseAndLowercase] =
    useState<boolean>(false)
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState<boolean>(false)
  const [passwordSecurityLevel, setPasswordSecurityLevel] = useState<number>(0)

  const passwordStatus = (text: string, isValid: boolean) : JSX.Element => {
    return (
      <div className="flex gap-1 items-center">
        {isValid ? (
          <CheckCircle className="fill-green-500" size={10} />
        ) : (
          <Info className="fill-gray-500" size={10} />
        )}
        <p
          className={`${isValid ? 'text-green-500' : 'text-gray-500'} text-xs `}
        >
          {text}
        </p>
      </div>
    )
  }

  const getPasswordStatusBar = (isActive: boolean): JSX.Element => {
    let statusBarColor = passwordSecurityLevel == 3 ? 'bg-green-500' : 'bg-orange-500'

    return (
      <div
        className={`${
          isActive ? statusBarColor : 'bg-gray-ctr-3'
        } flex flex-1 h-1`}
      ></div>
    )
  }

  const getPasswordSecurityMessage = (): string => {
    if (passwordSecurityLevel === 1) {
      return 'Senha fraca. Ainda há espaço para melhorar.'
    } else if (passwordSecurityLevel === 2) {
      return 'Senha média. Ainda há espaço para melhorar.'
    } else if (passwordSecurityLevel >= 3) {
      return 'Senha segura.'
    } else {
      return 'Crie uma senha segura.'
    }
  }

  const controlPasswordSecurityLevel = (): void => {
    let securityLevel = 0
    if (hasNumber) {
      securityLevel++
    }
    if (hasUppercaseAndLowercase) {
      securityLevel++
    }
    if (hasSpecialCharacter) {
      securityLevel++
    }
    setPasswordSecurityLevel(securityLevel)
  }

  const hasNumberTest = (): void => {
    const hasNumberTestResult = /[0-9]/.test(password)
    setHasNumber(hasNumberTestResult)
  }

  const hasUppercaseAndLowercaseTest = (): void => {
    const hasUpperCaseTestResult = /[A-Z]/.test(password)
    const hasLowerCaseTestResult = /[a-z]/.test(password)
    setHasUppercaseAndLowercase(
      hasUpperCaseTestResult && hasLowerCaseTestResult
    )
  }

  const hasSpecialCharacterTest = (): void => {
    const hasSpecialCharacterTestResult = /[\p{P}\p{S}]/u.test(password)
    setHasSpecialCharacter(hasSpecialCharacterTestResult)
  }

  useEffect(() => {
    controlPasswordSecurityLevel()
  }, [hasNumber, hasUppercaseAndLowercase, hasSpecialCharacter])

  useEffect(() => {
    hasNumberTest()
    hasUppercaseAndLowercaseTest()
    hasSpecialCharacterTest()
  }, [password])

  return (
    <div className="flex flex-col gap-1">
      <div className="text-grey-txt-2">
        {passwordStatus('Deve ter pelo menos um número', hasNumber)}
        {passwordStatus(
          'Deve ter pelo menos uma letra maiúscula e uma minúscula',
          hasUppercaseAndLowercase
        )}
        {passwordStatus(
          'Deve ter pelo menos um caractere especial',
          hasSpecialCharacter
        )}
      </div>
      <div className="flex gap-1 justify-between  ">
        {getPasswordStatusBar(passwordSecurityLevel >= 1)}
        {getPasswordStatusBar(passwordSecurityLevel >= 2)}
        {getPasswordStatusBar(passwordSecurityLevel >= 3)}
      </div>
      <p className="text-grey-txt-2 text-xs">{getPasswordSecurityMessage()}</p>
    </div>
  )
}
