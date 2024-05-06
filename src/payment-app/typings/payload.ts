export interface Payload {
  orderId: string
  transactionId: string
  paymentId: string
  timestamp: Date
  approvePaymentUrl?: string
  deniedPaymentUrl?: string
}
