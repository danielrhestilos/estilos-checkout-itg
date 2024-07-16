import { useState } from 'react'

import type { OrderForm } from '../typings/orderForm'
import { request } from './useApiRequest'

const useOrderForm = () => {
  const [orderForm, setOrderForm] = useState<OrderForm>()
  const [loading, setLoading] = useState(false)

  const getOrderForm = async () => {
    try {
      setLoading(true)
      const localOrderForm: OrderForm =
        await window.vtexjs.checkout.getOrderForm()

      const response = await request<OrderForm>({
        url: `/_v/api/tarjeta-estilos/getOrderForm/${localOrderForm.orderFormId}`,
        method: 'GET',
      })

      setOrderForm(response)      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching order form: ', error)
      setLoading(false)
    }
  }

  const updatePaymentOrderForm = async (data?: any) => {
    try {
      setLoading(true)
      const orderFormId =
        await window.vtexjs.checkout.orderFormId

      const response = await request<OrderForm>({
        url: `/_v/api/tarjeta-estilos/updateCustomData`,
        body: {
          "appId": "tarjetaestilos",
          customData: [
            {
              field: "paymentmethod",
              value: data.paymentType !== '' ? parseInt(data.paymentType, 10) : 0,
            },
            {
              field: "installments",
              value: data.installments !== '' ? parseInt(data.installments, 10) : 0,
            }
          ],
          orderFormId,
        },
        method: 'POST',
      })

      setLoading(false)

      return response
    } catch (error) {
      console.error('Error fetching order form: ', error)
      setLoading(false)

      return error
    }
  }
  // console.log("orderForm : ",orderForm);
  
  return { orderForm, loading, getOrderForm, updatePaymentOrderForm }
}

export default useOrderForm
