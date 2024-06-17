import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ICart } from '@/types/cart.type'

export type InitialStateType = {
  cart: ICart[]
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: []
  } as InitialStateType,
  reducers: {
    addProductToCart: (state, action: PayloadAction<ICart>) => {
      // kiểm tra sản phẩm đã có trong giỏ hàng chưa nếu có thì tăng số lượng lên
      const index = state.cart.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.nameSize === action.payload.nameSize &&
          item.nameColor === action.payload.nameColor
      )
      if (index !== -1) {
        state.cart[index].quantity += action.payload.quantity
      } else {
        state.cart.push(action.payload)
      }
    },
    removeProductToCart: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex((item) => item._id === action.payload)
      if (index !== -1) {
        state.cart.splice(index, 1)
      }
      return state
    },
    removeMultiplePrdCart: (state) => {
      state.cart = []
    },
    decreQuantity: (state, action: PayloadAction<number>) => {
      const index = state.cart.findIndex((_, i) => i === action.payload)
      if (index !== -1) {
        if (state.cart[index].quantity > 1) {
          state.cart[index].quantity -= 1
        }
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const index = state.cart.findIndex((_, i) => i === +action.payload)
      if (index !== -1) {
        state.cart[index].quantity += 1
      }
    }
  }
})

export const {
  addProductToCart,
  removeProductToCart,
  removeMultiplePrdCart,

  decreQuantity,
  increaseQuantity
} = cartSlice.actions
const cartReducer = cartSlice.reducer
export default cartReducer
