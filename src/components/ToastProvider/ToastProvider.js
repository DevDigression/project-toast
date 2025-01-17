import React from 'react'
import { useKeyDown } from '../../hooks'
export const ToastContext = React.createContext()

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([])
  const [formInput, setFormInput] = React.useState({
    message: '',
    variant: 'notice',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormInput({
      ...formInput,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formInput.message || !formInput.variant) {
      return
    }

    const newToast = {
      ...formInput,
      id: crypto.randomUUID(),
    }

    setToasts([...toasts, newToast])
    setFormInput({
      message: '',
      variant: 'notice',
    })
  }

  const handleKeyDown = React.useCallback(() => {
    setToasts([])
  }, [])
  useKeyDown('Escape', handleKeyDown)

  return (
    <ToastContext.Provider
      value={{
        toasts,
        setToasts,
        formInput,
        setFormInput,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
