export interface IUser {
  _id: string
  name: string
  fullname: string
  ngaysinh: string
  email: string
  password: string
  role: {
    _id: string
    role_name: string
  }

  trang_thai: StatusActive
  image_url: string
  favoriteProducts: string[]
  addressUser: string[]
  createdAt: string
  updatedAt: string
  otp: null
  is_deleted: boolean
  phone: string
}

export interface ISignin {
  email: string
  password: string
}
export interface ISignUp {
  email: string
  password: string
  name: string
  fullname: string
  ngaysinh: Date
  confirmPassword: string
}

enum StatusActive {
  Active = 'Active',
  Inactive = 'Inactive'
}

export interface IResUser<T> {
  message: string
  users: T
}

export interface ISignUp {
  email: string
  password: string
  name: string
  fullname: string
  ngaysinh: Date
  confirmPassword: string
  role?: string
}
