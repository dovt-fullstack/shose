export interface IProduct {
  isdeleted: boolean
  wareHose_id: string
  category_id: string
  inventoryStatus: string
  status: string
  _id: string
  name: string
  price: number
  image: string[]
  description: string
  quantity: number
  sale: string
  categoryId: string
  colorSizes: {
    color: string
    sizes: {
      size: string
      _id: string
    }[]
    _id: string
  }[]
  is_deleted: boolean
  trang_thai: string
  createdAt: string
  updatedAt: string
  hot_sale: number
  listQuantityRemain: IListQuantityRemain[]
  warehouseId: string
}

export interface IListQuantityRemain {
  colorHex: string
  nameColor: string
  nameSize: string
  quantity: number
  _id?: string
}

export interface IResDataProducts {
  message: string
  products: IProduct[]
}
export interface IResProduct {
  message: string
  product: IProduct
}

export interface ImageProduct {
  _id: string
  image: string[]
  trang_thai: string
}
