import { IProduct } from '.'
import { IUser } from './user.type'

export interface IResData<T> {
  message: string
  data: T
}

export interface ISOrder {
  products: {
    product: IProduct
    quantity: number
    color: string
    size: string
  }[]
  user: IUser
  _id: {
    _id: string
    user_id: string
    address: string
    status: string
    total_amount_paid: number
    payment_type: string
    total_price: number
    createdAt: string
    updatedAt: string
  }
  user_id: string
  address: string
  status: string
  total_amount_paid: number
  payment_type: string
  total_price: number
  createdAt: string
  updatedAt: string
}
