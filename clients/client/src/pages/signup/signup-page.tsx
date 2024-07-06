import { Link, useNavigate } from 'react-router-dom'

import { BsCheckCircleFill } from 'react-icons/bs'
import { ISignUp } from '../../../../admin/src/interfaces/user'
import { logoLight } from '@/assets/images'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useSignupMutation } from '@/store/services/auth.service'

export const SignupPage = () => {
  const { handleSubmit, register } = useForm<ISignUp>()

  const [signup] = useSignupMutation()
  const navigate = useNavigate()
  const onSubmit = (values: ISignUp) => {
    const { password, confirmPassword } = values
    if (password !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!')
      return
    }

    if (password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 kí tự!')
      return
    }

    signup({ ...values, role: '65606979d64aaded70cde8e7' })
      .unwrap()
      .then(() => {
        toast.success('Đăng ký thành công!')
        navigate('/signin')
      })
      .catch((error) => {
        toast.error('Đăng ký thất bại. Vui lòng thử lại!')
        console.log(error)
      })
  }

  return (
    <div className='flex items-center justify-start w-full h-screen'>
      <div className='hidden w-1/2 h-full text-white lgl:inline-flex'>
        <div className='w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center'>
          <Link to='/'>
            <img src={logoLight} alt='logoImg' className='w-28' />
          </Link>
          <div className='flex flex-col gap-1 -mt-1'>
            <h1 className='text-xl font-medium font-titleFont'>Get started for free</h1>
            <p className='text-base'>Create your account to access more</p>
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
            <p className='text-sm font-semibold text-gray-300 duration-300 cursor-pointer font-titleFont hover:text-white'>
              © OREBI
            </p>
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
      <div className='w-full lgl:w-[500px] h-full flex flex-col items-center justify-center'>
        <form
          className='w-full lgl:w-[500px] h-screen flex items-center justify-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='px-6 py-4 w-full h-[96%] flex flex-col justify-center items-center overflow-y-scroll scrollbar-hide scrollbar-thumb-primeColor'>
            <h1 className='font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4'>
              Đăng ký tài khoản
            </h1>
            <div className='flex flex-col w-full gap-3'>
              {/* name */}
              <div className='flex flex-col gap-.5'>
                <p className='text-base font-semibold text-gray-600 font-titleFont'>Tên</p>
                <input
                  {...register('name')}
                  className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                  type='text'
                  placeholder='Nhập tên tài khoản'
                />
              </div>
              {/* client name */}
              <div className='flex flex-col gap-.5'>
                <p className='text-base font-semibold text-gray-600 font-titleFont'>Full Name</p>
                <input
                  {...register('fullname')}
                  className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                  type='text'
                  placeholder='eg. John Doe'
                />
              </div>
              {/* Email */}
              <div className='flex flex-col gap-.5'>
                <p className='text-base font-semibold text-gray-600 font-titleFont'>Email</p>
                <input
                  {...register('email')}
                  className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                  type='email'
                  placeholder='john@workemail.com'
                />
              </div>

              <div className='flex flex-col gap-.5'>
                <p className='text-base font-semibold text-gray-600 font-titleFont'>Ngày sinh</p>
                <input
                  {...register('ngaysinh')}
                  className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                  type='date'
                />
              </div>

              {/* Password */}
              <div className='flex flex-col gap-.5'>
                <p className='text-base font-semibold text-gray-600 font-titleFont'>Password</p>
                <input
                  {...register('password')}
                  className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                  type='password'
                  placeholder='Create password'
                />
              </div>
              <div className='flex flex-col gap-.5'>
                <p className='text-base font-semibold text-gray-600 font-titleFont'>Confirm Password</p>
                <input
                  {...register('confirmPassword')}
                  className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                  type='password'
                  placeholder='Confirm password'
                />
              </div>

              <button
                className={`${
                  true
                    ? 'bg-primeColor hover:bg-black hover:text-white cursor-pointer'
                    : 'bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none'
                } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
              >
                Đăng ký
              </button>
              <p className='text-sm font-medium text-center font-titleFont'>
               Đã có tài khoản?{' '}
                <Link to='/signin'>
                  <span className='duration-300 hover:text-blue-600'>Đăng Nhập</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
