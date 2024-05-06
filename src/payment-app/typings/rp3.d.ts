export interface CardInfo {
  Authorization: number
  Success: boolean
  HasError: boolean
  Message: string
  ErrorMessage: string
  CardAccount: number
  CardIdentification: string
  CardHolderName: string
  CardPassword: string
  CardExpires: string
  CardOwner: string
  CurrentBalance: number
  OverdueAmount: number
  OverdueDays: number
  OverduePayments: number
  FirstPurchase: boolean
  Verification: number
  AvailableCredit: number
  Province: string
  CardNumber: string
  CardType: string
}
