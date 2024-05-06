import { useState } from 'react'

import type { CardData, DeferredOption, PaymentMethod } from '../typings/types'
import { request } from './useApiRequest'
import { encrypt } from '../utils'

const useRp3 = () => {
  const [cardInfo, setCardInfo] = useState<CardData>()
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod>()
  const [simulation, setSimulationResult] = useState<any>()
  const [transactionResult, setTransactionResult] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const getCardInfo = async (cardnumber: string, dni: string, password: string) => {
    try {
      setLoading(true)
      const response: any = await request({
        url: '/_v/api/estilospe/getcardinfo',
        body: encrypt(
          JSON.stringify({
            cardnumber,
            password,
            dni,
          }),
          true
        ),
        method: 'POST',
      })
      if (response.error) {
        return false
      }

      setCardInfo(response.result)
      setLoading(false)
      window.sessionStorage.setItem('card', JSON.stringify(encrypt(cardnumber)))

      return response.result
    } catch (cardInfoError) {
      console.error(error)
      const typedError = cardInfoError as Error

      setLoading(false)
      setErrorMessage(typedError.message)
      setError(true)

      return typedError
    }
  }

  const getPaymentMethods = async (cardNumber: string) => {
    try {
      setLoading(true)
      const response: any = await request({
        url: `/_v/api/estilospe/getrates`,
        body: encrypt(
          JSON.stringify({
            cardnumber: cardNumber,
          }),
          true
        ),
        method: 'POST',
      })

      const data = response.result

      const dataGrouped: any = {}

      data.forEach((item: any) => {
        if (!dataGrouped[item.DeferredType]) {
          dataGrouped[item.DeferredType] = []
        }

        dataGrouped[item.DeferredType].push(item)
      })

      const rates = Object.entries(dataGrouped).map(([key, value]) => {
        const paymentsOptions = value as DeferredOption[]

        return {
          DeferredType: key,
          DeferredTypeId: paymentsOptions[0].DeferredTypeId,
          data: paymentsOptions.map((option) => option.Term),
        }
      })

      const types = rates.map((rate) => ({
        label: rate.DeferredType,
        value: rate.DeferredTypeId,
      }))

      const terms = rates.map((rate) =>
        rate.data.map((term) => ({
          label: term,
          value: term,
        }))
      )

      const paymentsMethods = {
        types,
        terms,
      }

      setPaymentMethods(paymentsMethods)
      setLoading(false)

      return paymentsMethods
    } catch (paymentMethodsError) {
      console.error(error)
      const typedError = paymentMethodsError as Error

      setLoading(false)
      setErrorMessage(typedError.message)
      setError(true)

      return typedError
    }
  }

  const getSimulation = async (simulationData: any) => {
    try {
      setLoading(true)

      const response: any = await request({
        url: '/_v/api/estilospe/getsimulation',
        body: encrypt(
          JSON.stringify({
            ...simulationData,
          }),
          true
        ),
        method: 'POST',
      })

      setSimulationResult(response.result)
      setLoading(false)
    } catch (simulationError) {
      console.error(error)
      const typedError = simulationError as Error

      setLoading(false)
      setErrorMessage(typedError.message)
      setError(true)
    }
  }

  const registerTransaction = async (transactionData: any) => {
    try {
      setLoading(true)

      const response: any = await request({
        url: '/_v/api/estilospe/registertransaction',
        body: encrypt(
          JSON.stringify({
            ...transactionData,
          }),
          true
        ),
        method: 'POST',
      })

      setTransactionResult(response.data)
      setLoading(false)
    } catch (registerTransactionError) {
      console.error(error)
      const typedError = registerTransactionError as Error

      setLoading(false)
      setErrorMessage(typedError.message)
      setError(true)
    }
  }

  const resetError = () => {
    setError(false)
    setErrorMessage(undefined)
  }

  return {
    cardInfo,
    getCardInfo,
    paymentMethods,
    getPaymentMethods,
    simulation,
    getSimulation,
    transactionResult,
    registerTransaction,
    loading,
    error,
    errorMessage,
    resetError,
  }
}

export default useRp3
