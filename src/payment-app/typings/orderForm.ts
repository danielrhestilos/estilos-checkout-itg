export interface OrderForm {
  orderFormId: string
  salesChannel: string
  loggedIn: boolean
  isCheckedIn: boolean
  storeId: any
  checkedInPickupPointId: any
  allowManualPrice: boolean
  canEditData: boolean
  userProfileId: string
  userType: any
  ignoreProfileData: boolean
  value: number
  messages: any[]
  items: Item[]
  selectableGifts: any[]
  totalizers: Totalizer[]
  shippingData: ShippingData
  clientProfileData: ClientProfileData
  paymentData: PaymentData
  marketingData: any
  sellers: Seller[]
  clientPreferencesData: ClientPreferencesData
  commercialConditionData: any
  storePreferencesData: StorePreferencesData
  giftRegistryData: any
  openTextField: any
  invoiceData: any
  customData: any
  itemMetadata: ItemMetadata
  hooksData: any
  ratesAndBenefitsData: RatesAndBenefitsData
  subscriptionData: any
  merchantContextData: any
  itemsOrdination: any
}

export interface Item {
  uniqueId: string
  id: string
  productId: string
  productRefId: string
  refId: any
  ean: string
  name: string
  skuName: string
  modalType: any
  parentItemIndex: any
  parentAssemblyBinding: any
  assemblies: any[]
  priceValidUntil: string
  tax: number
  price: number
  listPrice: number
  manualPrice: any
  manualPriceAppliedBy: any
  sellingPrice: number
  rewardValue: number
  isGift: boolean
  additionalInfo: AdditionalInfo
  preSaleDate: any
  productCategoryIds: string
  productCategories: ProductCategories
  quantity: number
  seller: string
  sellerChain: string[]
  imageUrl: string
  detailUrl: string
  components: any[]
  bundleItems: any[]
  attachments: any[]
  attachmentOfferings: any[]
  offerings: any[]
  priceTags: any[]
  availability: string
  measurementUnit: string
  unitMultiplier: number
  manufacturerCode: any
  priceDefinition: PriceDefinition
  taxCode: string
}

export interface AdditionalInfo {
  dimension: any
  brandName: string
  brandId: string
  offeringInfo: any
  offeringType: any
  offeringTypeId: any
}

export interface ProductCategories {
  "1": string
}

export interface PriceDefinition {
  calculatedSellingPrice: number
  total: number
  sellingPrices: SellingPrice[]
}

export interface SellingPrice {
  value: number
  quantity: number
}

export interface Totalizer {
  id: string
  name: string
  value: number
}

export interface ShippingData {
  address: Address
  logisticsInfo: LogisticsInfo[]
  selectedAddresses: SelectedAddress[]
  availableAddresses: AvailableAddress[]
  pickupPoints: any[]
}

export interface Address {
  addressType: string
  receiverName: string
  addressId: string
  isDisposable: boolean
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: any
  reference: any
  geoCoordinates: any[]
}

export interface LogisticsInfo {
  itemIndex: number
  selectedSla: string
  selectedDeliveryChannel: string
  addressId: string
  slas: Sla[]
  shipsTo: string[]
  itemId: string
  deliveryChannels: DeliveryChannel[]
}

export interface Sla {
  id: string
  deliveryChannel: string
  name: string
  deliveryIds: DeliveryId[]
  shippingEstimate: string
  shippingEstimateDate: any
  lockTTL: any
  availableDeliveryWindows: any[]
  deliveryWindow: any
  price: number
  listPrice: number
  tax: number
  pickupStoreInfo: PickupStoreInfo
  pickupPointId: any
  pickupDistance: number
  polygonName: string
  transitTime: string
}

export interface DeliveryId {
  courierId: string
  warehouseId: string
  dockId: string
  courierName: string
  quantity: number
  kitItemDetails: any[]
}

export interface PickupStoreInfo {
  isPickupStore: boolean
  friendlyName: any
  address: any
  additionalInfo: any
  dockId: any
}

export interface DeliveryChannel {
  id: string
}

export interface SelectedAddress {
  addressType: string
  receiverName: string
  addressId: string
  isDisposable: boolean
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: any
  reference: any
  geoCoordinates: any[]
}

export interface AvailableAddress {
  addressType: string
  receiverName: string
  addressId: string
  isDisposable: boolean
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: any
  reference: any
  geoCoordinates: any[]
}

export interface ClientProfileData {
  email: string
  firstName: string
  lastName: string
  document: string
  documentType: string
  phone: string
  corporateName: any
  tradeName: any
  corporateDocument: any
  stateInscription: any
  corporatePhone: any
  isCorporate: boolean
  profileCompleteOnLoading: boolean
  profileErrorOnLoading: boolean
  customerClass: any
}

export interface PaymentData {
  updateStatus: string
  installmentOptions: InstallmentOption[]
  paymentSystems: PaymentSystem[]
  payments: Payment[]
  giftCards: any[]
  giftCardMessages: any[]
  availableAccounts: any[]
  availableTokens: any[]
  availableAssociations: AvailableAssociations
}

export interface InstallmentOption {
  paymentSystem: string
  bin: any
  paymentName: any
  paymentGroupName: any
  value: number
  installments: Installment[]
}

export interface Installment {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: SellerMerchantInstallment[]
}

export interface SellerMerchantInstallment {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}

export interface PaymentSystem {
  id: number
  name: string
  groupName: string
  validator: Validator
  stringId: string
  template: string
  requiresDocument: boolean
  displayDocument: boolean
  isCustom: boolean
  description: string
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: any
}

export interface Validator {
  regex: any
  mask: any
  cardCodeRegex: any
  cardCodeMask: any
  weights: any
  useCvv: boolean
  useExpirationDate: boolean
  useCardHolderName: boolean
  useBillingAddress: boolean
}

export interface Payment {
  paymentSystem: string
  bin: any
  accountId: any
  tokenId: any
  installments: number
  referenceValue: number
  value: number
  merchantSellerPayments: MerchantSellerPayment[]
}

export interface MerchantSellerPayment {
  id: string
  installments: number
  referenceValue: number
  value: number
  interestRate: number
  installmentValue: number
}

export interface AvailableAssociations {}

export interface Seller {
  id: string
  name: string
  logo: string
}

export interface ClientPreferencesData {
  locale: string
  optinNewsLetter: boolean
}

export interface StorePreferencesData {
  countryCode: string
  saveUserData: boolean
  timeZone: string
  currencyCode: string
  currencyLocale: number
  currencySymbol: string
  currencyFormatInfo: CurrencyFormatInfo
}

export interface CurrencyFormatInfo {
  currencyDecimalDigits: number
  currencyDecimalSeparator: string
  currencyGroupSeparator: string
  currencyGroupSize: number
  startsWithCurrencySymbol: boolean
}

export interface ItemMetadata {
  items: Item2[]
}

export interface Item2 {
  id: string
  seller: string
  name: string
  skuName: string
  productId: string
  refId: any
  ean: string
  imageUrl: string
  detailUrl: string
  assemblyOptions: any[]
}

export interface RatesAndBenefitsData {
  rateAndBenefitsIdentifiers: any[]
  teaser: any[]
}
