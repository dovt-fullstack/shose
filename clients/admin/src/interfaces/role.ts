export interface ISize {
  _id?: number
  name: string
  quantity: number
}

export interface IRole {
  _id: string
  description: string
  role_name: string
  trang_thai: 'Active' | 'Inactive'
  // customerId: IUser;
}
