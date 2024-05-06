export type PaymentType = {
  id: string
  name: string
}

export type CardData = {
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

export type DeferredOption = {
  Term: string
  DeferredType: string
  DeferredTypeId: string
}

export type Simulation = {
  Code: number
  Company: string
  Account: string
  Card: string
  CardBin: string
  Principal: number
  InterestRate: number
  Term: number
  DeferredMonths: number
  InstallmentNumber: number
  InstallmentPrincipalAmount: number
  InstallmentInterestAmount: number
  InstallmentDeferredInterestAmount: number
  InstallmentDeferredCapitalAmount: number
  TotalInterestAmount: number
  PaymentDate: string
}

export type Rates = {
  DeferredType: string
  DeferredTypeId: string
  data: string[]
}

export type PaymentOption = {
  label: string
  value: string
}

export type Term = {
  label: string
  value: string
}

export type PaymentMethod = {
  types: PaymentOption[]
  terms: Term[][]
}
