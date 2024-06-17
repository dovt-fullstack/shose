export interface IPayment {
  _id?: string

  createdAt: string
}
export interface ISale {
  _id: string
  name: string
  sale: string
  usageLimit: number
  expirationDate: string
  createdAt: string
  code: string
  type: string
}

export interface ISize {
  _id?: string
  name: number
  quantity: number
}
