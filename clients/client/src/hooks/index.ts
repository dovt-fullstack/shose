import { useAppDispatch } from '@/store'
import { clearUser } from '@/store/slices/auth.slice'
import { message } from 'antd'
import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useDebounce(effect: () => void, dependencies: any, delay: number) {
  const callback = useCallback(effect, dependencies)

  useEffect(() => {
    const timeout = setTimeout(callback, delay)
    return () => clearTimeout(timeout)
  }, [callback, delay])
}

export const useLogout = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.clear()
    sessionStorage.clear()
    dispatch(clearUser())
    message.success('Đã đăng xuất thành công')
    navigate('/')
  }
  return { handleLogout }
}
