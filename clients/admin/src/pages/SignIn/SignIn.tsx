import { useSigninMutation } from '@/api/auth'
import { ISignin } from '@/interfaces/user'
import { message } from 'antd'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

export default function SignIn() {
  const { handleSubmit, register } = useForm<ISignin>()
  const [signin] = useSigninMutation()
  const navigate = useNavigate()

  const onFinish = (data: ISignin) => {
    signin(data)
      .unwrap()
      .then((res) => {
        if (res && res.user && res.user.role.role_name) {
          const user = res.user
          localStorage.setItem('user', JSON.stringify(user))
          if (res.user?.role?.role_name === 'admin') {
            message.success('Đăng nhập thành công với vai trò ' + res.user.role.role_name)
            navigate('/admin')
          } else if (res.user?.role?.role_name === 'nhân viên') {
            message.success('Đăng nhập thành công với vai trò ' + res.user.role.role_name)
            navigate('/admin')
          } else if (res.user?.role?.role_name === 'quản lý') {
            message.success('Đăng nhập thành công với vai trò ' + res.user.role.role_name)
            navigate('/admin')
          } else {
            message.error('Bạn không có quyền truy cập trang này')
          }
        } else {
          message.error('Đăng nhập không thành công, tài khoản hoặc mật khẩu không chính xác')
        }
      })
  }
  return (
    <>
      <script src='https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js' defer></script>
      <script src='https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js'></script>
      <style>
        @import
        url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')
      </style>

      <div className='min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5'>
        <div className='bg-gray-100 text-black rounded-3xl shadow-xl w-full overflow-hidden'>
          <div className='md:flex w-full'>
            <div className='hidden md:block w-1/2 bg-black py-10 px-10 d-flex justify-content-center'>
              <img
                src='https://bouncin.net/storage/posts/1345/YFyAqfIwqKJ1SVW9M11UqRRZjpnIdYLJQgYTzDpf.jpeg'
                className=''
                alt=''
              />
            </div>
            <div className='w-full md:w-1/2 py-10 px-5 md:px-10'>
              <div className='text-center mb-10'>
                <h1 className='font-bold text-3xl text-gray-900 mb-5'>ĐĂNG NHẬP</h1>
                <p>Nhập thông tin của bạn để đăng nhập</p>
              </div>
              <div className='flex flex-col items-center mb-7'>
                <button className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'>
                  <div className='bg-white p-2 rounded-full'>
                    <svg className='w-4' viewBox='0 0 533.5 544.3'>
                      <path
                        d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
                        fill='#4285f4'
                      />
                      <path
                        d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
                        fill='#34a853'
                      />
                      <path
                        d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
                        fill='#fbbc04'
                      />
                      <path
                        d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
                        fill='#ea4335'
                      />
                    </svg>
                  </div>
                  <span className='ml-4'>Sign In with Google</span>
                </button>
              </div>
              <div>
                <div className='mx-auto max-w-xs'>
                  <form onSubmit={handleSubmit(onFinish)}>
                    <label htmlFor='' className='text-xs font-semibold px-1'>
                      Email
                    </label>
                    <div className='flex mt-3 mb-3'>
                      <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'>
                        <i className='mdi mdi-account-outline text-gray-400 text-lg'></i>
                      </div>
                      <input
                        className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                        type='email'
                        placeholder='Email'
                        autoComplete='email'
                        {...register('email')}
                        required
                      />
                    </div>
                    <label htmlFor='' className='text-xs font-semibold px-1'>
                      Mật khẩu
                    </label>
                    <div className='flex mt-3'>
                      <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'>
                        <i className='mdi  mdi-lock-outline text-gray-400 text-lg'></i>
                      </div>
                      <input
                        className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                        type='password'
                        {...register('password')}
                        required
                        placeholder='Passworld'
                      />
                    </div>
                    <div className='flex -mx-3 mt-5'>
                      <div className='w-full px-3 mb-5 text-black hover:text-blue-400'>
                        <Link to='/forgotPassword'>Quên mật khẩu</Link>
                      </div>
                    </div>
                    <button
                      type='submit'
                      className='mt-2 tracking-wide font-semibold bg-slate-900 text-white w-full py-4 rounded-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                    >
                      Đăng nhập
                    </button>
                  </form>
                </div>
                <div className='flex -mx-3 mt-5'>
                  <div className='w-full px-3 mb-5 text-center text-black hover:text-blue-400'>
                    <Link to='/signup'>Bạn có muốn chuyển sang trang đăng ký?</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
