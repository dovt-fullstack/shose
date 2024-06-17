export interface ICategory {
  _id: string
  name: string
  desciption: string
  image: string[]
  createdAt: string
}

export interface ICategoryResponse {
  message: string
  data: ICategory[]
}
