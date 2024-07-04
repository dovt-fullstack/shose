import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ICart } from '@/types/cart.type'

export type InitialStateType = {
  cart: ICart[]
}

const CategorySilie = createSlice({
  name: 'category',
  initialState: {
    category: ''
  } as any,
  reducers: {
    setFillterCategory: (state, action: PayloadAction<any>) => {
      // kiểm tra sản phẩm đã có trong giỏ hàng chưa nếu có thì tăng số lượng lên
        state.category = action.payload
    },
  }
})

export const {
    setFillterCategory,
} = CategorySilie.actions
const categoryReducer = CategorySilie.reducer
export default categoryReducer
