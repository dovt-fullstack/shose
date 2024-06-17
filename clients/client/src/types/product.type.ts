export interface IProduct {
  _id: string
  name: string
  price: number
  hot_sale?: number
  image: Array<string>
  listQuantityRemain: IListQuantityRemain[]
  categoryId: string | number | object
  description: string
  quantity: number
}

export interface IProductResponse {
  products: IProduct[]
  message: string
}

export interface IListQuantityRemain {
  nameSize: string
  quantity: number
  _id: string
  nameColor: string
  colorHext: string
}
