import { FaCaretDown, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useGetProductsQuery } from '@/store'
import { useEffect, useRef, useState } from 'react'

import { Flex } from '@/components'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { IProduct } from '@/types'
import { motion } from 'framer-motion'
import { useLogout } from '@/hooks'

export const HeaderBottom = () => {
  const { data: productData } = useGetProductsQuery()

  const [products, setProducts] = useState<IProduct[]>(productData?.products || [])

  const {
    user: { user },
    cart
  } = useAppSelector((state) => state)
  const [show, setShow] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const ref = useRef(null)

  const { handleLogout } = useLogout()

  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if ((ref as any)?.current?.contains(e.target)) {
        setShow(true)
      } else {
        setShow(false)
      }
    })
  }, [show, ref])

  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])
  // const [showSearchBar, setShowSearchBar] = useState(false)

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    if (!searchQuery || searchQuery === '') {
      setFilteredProducts([])
    }
    const filtered = products.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredProducts(filtered)
  }, [searchQuery, products])

  useEffect(() => {
    if (productData) {
      setProducts(productData.products)
    }
  }, [productData])
  return (
    <div className='w-full bg-[#F5F5F3] relative'>
      <div className='mx-auto max-w-container'>
        <Flex className='flex flex-col items-start justify-between w-full h-full px-4 pb-4 lg:flex-row lg:items-center lg:pb-0 lg:h-24'>
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className='flex items-center gap-2 cursor-pointer h-14 text-primeColor'
          >
            <HiOutlineMenuAlt4 className='w-5 h-5' />
            <p className='text-[14px] font-normal'>Shop by Category</p>

            {show && (
              <motion.ul
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6'
              >
                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                  Accessories
                </li>
                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                  Furniture
                </li>
                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                  Electronics
                </li>
                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                  Clothes
                </li>
                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                  Bags
                </li>
                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                  Home appliances
                </li>
              </motion.ul>
            )}
          </div>
          <div className='relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl'>
            <input
              className='flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]'
              type='text'
              onChange={handleSearch}
              value={searchQuery}
              placeholder='Search your products here'
            />
            <FaSearch className='w-5 h-5' />
            {searchQuery !== '' && (
              <div
                className={`w-full mx-auto p-4 h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >
                {filteredProducts &&
                  filteredProducts.length > 0 &&
                  filteredProducts.map((product) => (
                    <div
                      onClick={() => {
                        navigate(`/product/${product._id}`)
                        setSearchQuery('')
                      }}
                      key={product._id}
                      className='max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3'
                    >
                      <img className='w-24' src={product.image[0]} alt='productImg' />
                      <div className='flex flex-col gap-1'>
                        <p className='text-lg font-semibold'>{product.name}</p>
                        <p className='text-xs truncate w-[400px]'>{product.description}</p>
                        <p className='text-sm'>
                          Price: <span className='font-semibold text-primeColor'>{product.price.toLocaleString()}</span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className='relative flex items-center gap-4 pr-6 mt-2 cursor-pointer lg:mt-0'>
            <div onClick={() => setShowUser(!showUser)} className='flex'>
              <FaUser />
              <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-3 pb-6'
              >
                {user ? (
                  <>
                    <Link
                      to={'/profile'}
                      className='w-full inline-block text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'
                    >
                      Profile
                    </Link>
                    {['quản lý', 'admin'].includes(user.role.role_name) && (
                      <p>
                        <a
                          href={'http://127.0.0.1:4000/admin'}
                          className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'
                        >
                          Admin Manage
                        </a>
                      </p>
                    )}
                    <li
                      className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer'
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </>
                ) : (
                  <>
                    <Link to='/signin'>
                      <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                        Login
                      </li>
                    </Link>
                    <Link onClick={() => setShowUser(false)} to='/signup'>
                      <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                        Sign Up
                      </li>
                    </Link>
                  </>
                )}
              </motion.ul>
            )}
            <Link to='/cart'>
              <div className='relative'>
                <FaShoppingCart />
                <span className='absolute flex items-center justify-center w-4 h-4 text-xs text-white rounded-full font-titleFont top-3 -right-2 bg-primeColor'>
                  {cart.cart.length > 0 ? cart.cart.length : 0}
                </span>
              </div>
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  )
}
