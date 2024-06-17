const pathRouter = {
  admin: 'admin',
  signin: '',
  signup: 'signup',
  // user
  userList: 'user',
  userAdd: 'user/add',
  userEdit: 'user/edit/:id',
  // product
  productList: 'product',
  productAdd: 'product/add',
  productEdit: 'product/update/:id',
  productDetail: 'product/:id',
  productRecycle: 'product/recycle',
  // category
  categoryList: 'category',
  categoryAdd: 'category/add',
  categoryEdit: 'category/edit/:id',
  // size
  sizeList: 'size',
  sizeAdd: 'size/add',
  sizeEdit: 'size/update/:id',
  // role
  roleList: 'role',
  roleAdd: 'role/add',
  roleUpdate: 'role/update/:id',
  // đơn hàng
  manageOrder: 'order',
  manageOrderDetail: 'order/:id',
  // tin tức
  news: 'news',
  newAdd: 'news/add',
  newEdit: 'news/edit/:id',
  newDetail: 'news/detailtintuc/:id',
  comments: 'comments',
  information: 'information',

  contact: 'contact',
  contactAdd: 'contact/add',
  contactEdit: 'contact/update/:idContact',
  // mã giảm giá
  voucher: 'voucher',
  home: '',
  // kho hàng
  warehose: 'warehose',
  recycle: 'recycle'
}

export { pathRouter }
