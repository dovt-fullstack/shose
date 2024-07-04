import * as yup from 'yup'

import { Link, useNavigate } from 'react-router-dom'

import { BsCheckCircleFill } from 'react-icons/bs'
import { logoLight } from '@/assets/images'
import { clearUser, setUser } from '@/store/slices/auth.slice'
import { toast } from 'react-toastify'
import { useAppDispatch } from '@/store'
import { useForm } from 'react-hook-form'
import { useSigninMutation } from '@/store/services/auth.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required()
  })
  .required()

export const SigninPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const [handleLogin, { isLoading }] = useSigninMutation()

  useEffect(() => {
    dispatch(clearUser())
  }, [])

  const onSubmit = (data: { email: string; password: string }) => {
    handleLogin(data)
      .unwrap()
      .then((res) => {
        dispatch(setUser(res.user))
        const user = res.user
        localStorage.setItem('user_client', JSON.stringify(user))
        navigate('/')
      })
      .catch(() => toast.error('Invalid credentials'))
  }
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='hidden w-1/2 h-full text-white lgl:inline-flex'>
        <div className='w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center'>
          <Link to='/'>
            <img src={logoLight} alt='logoImg' className='w-28' />
          </Link>
          <div className='flex flex-col gap-1 -mt-1'>
            <h1 className='text-xl font-medium font-titleFont'>Stay sign in for more</h1>
            <p className='text-base'>When you sign in, you are with us!</p>
          </div>
          <div className='w-[300px] flex items-start gap-3'>
            <span className='mt-1 text-green-500'>
              <BsCheckCircleFill />
            </span>
            <p className='text-base text-gray-300'>
              <span className='font-semibold text-white font-titleFont'>Get started fast with OREBI</span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className='w-[300px] flex items-start gap-3'>
            <span className='mt-1 text-green-500'>
              <BsCheckCircleFill />
            </span>
            <p className='text-base text-gray-300'>
              <span className='font-semibold text-white font-titleFont'>Access all OREBI services</span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className='w-[300px] flex items-start gap-3'>
            <span className='mt-1 text-green-500'>
              <BsCheckCircleFill />
            </span>
            <p className='text-base text-gray-300'>
              <span className='font-semibold text-white font-titleFont'>Trusted by online Shoppers</span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className='flex items-center justify-between mt-10'>
            <Link to='/'>
              <p className='text-sm font-semibold text-gray-300 duration-300 cursor-pointer font-titleFont hover:text-white'>
                © OREBI
              </p>
            </Link>
            <p className='text-sm font-semibold text-gray-300 duration-300 cursor-pointer font-titleFont hover:text-white'>
              Terms
            </p>
            <p className='text-sm font-semibold text-gray-300 duration-300 cursor-pointer font-titleFont hover:text-white'>
              Privacy
            </p>
            <p className='text-sm font-semibold text-gray-300 duration-300 cursor-pointer font-titleFont hover:text-white'>
              Security
            </p>
          </div>
        </div>
      </div>
      <div className='w-full h-full lgl:w-1/2'>
        <form
          className='w-full lgl:w-[450px] h-screen flex items-center justify-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-hide scrollbar-thumb-primeColor'>
            <h1 className='font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4'>
              Sign in
            </h1>
            <div className='flex flex-col gap-3'>
              {/* Email */}
              <div className='flex flex-col gap-.5'>
                <p className='text-base font-semibold text-gray-600 font-titleFont'>Work Email</p>
                <input
                  className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                  type='email'
                  placeholder='john@workemail.com'
                  {...register('email')}
                />
                {errors.email && (
                  <p className='px-4 text-sm font-semibold text-red-500 font-titleFont'>
                    <span className='mr-1 italic font-bold'>!</span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className='flex flex-col gap-.5'>
                <p className='text-base font-semibold text-gray-600 font-titleFont'>Password</p>
                <input
                  className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                  type='password'
                  placeholder='Create password'
                  {...register('password')}
                />
                {errors.password && (
                  <p className='px-4 text-sm font-semibold text-red-500 font-titleFont'>
                    <span className='mr-1 italic font-bold'>!</span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button className='w-full h-10 text-base font-medium text-gray-200 duration-300 rounded-md cursor-pointer bg-primeColor hover:bg-black hover:text-white'>
                {isLoading ? (
                  <div className='flex items-center justify-center'>
                    <div className='w-4 h-4 border-2 border-t-2 border-gray-200 rounded-full animate-spin'></div>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
              <p className='text-sm font-medium text-center font-titleFont'>
                Don't have an Account?{' '}
                <Link to='/signup'>
                  <span className='duration-300 hover:text-blue-600'>Sign up</span>
                </Link>
              </p>
              <p className='text-sm font-medium text-center font-titleFont'>
                
                <Link to='/forgotPasswordpage'>
                  <span className='duration-300 hover:text-blue-600'>ForgotPasswordPage?</span>
                </Link>
              </p>

            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
