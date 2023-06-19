'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '../Button/Button'
import { Moon, Sun } from '@phosphor-icons/react'

const ThemeSwitch = (): JSX.Element | null => {
  // Constants
  const { theme, setTheme } = useTheme()

  // States
  const [mounted, setMounted] = useState(false)

  // Effects
  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? (
    <div className="flex flex-col">
      <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        <span className="flex items-center gap-1">
          {theme === 'light' ? <Sun /> : <Moon />} Trocar tema
        </span>
      </Button>
    </div>
  ) : null
}

export default ThemeSwitch
