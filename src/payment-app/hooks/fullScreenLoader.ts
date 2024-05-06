import { useState } from 'react'

export const useFullScreenLoader = () => {
  const [showLoader, setShowLoader] = useState(false)

  const toggleLoader = () => {
    setShowLoader((prev) => {
      return !prev
    })
  }

  const showScreenLoader = () => {
    setShowLoader(true)
  }

  const hideScreenLoader = () => {
    setShowLoader(false)
  }

  return {
    showLoader,
    toggleLoader,
    showScreenLoader,
    hideScreenLoader
  }
}
