import { BsCheckCircleFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { logoLight } from '@/assets/images'
import axios from "axios";
import { useState } from "react";

export const ForgotPasswordPage = () => {

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await axios.patch('http://localhost:8080/api/auth/forgotpassword/', { email });
        setMessage(response.data.message);
      } catch (error:any) {
        setMessage(error.response.data.message);
      }
    };
  
    const handleSubmitResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await axios.patch('http://localhost:8080/api/auth/resetpassword/', { email, otp, newPassword });
        setMessage(response.data.message);
        // Clear form fields after successful password reset
        setEmail('');
        setOtp('');
        setNewPassword('');
      } catch (error :any) {
        setMessage(error.response.data.message);
      }
    };
  
    console.log("email",email)
    return(
        <>
        <div style={{display:'flex'}}>

      <div>
      <h2>Quên mật khẩu</h2>
      <p>{message}</p>

      {/* Form nhập email */}
      {!otp && (
        <form onSubmit={handleSubmitEmail}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Gửi yêu cầu</button>
        </form>
      )}

      {/* Form nhập OTP và mật khẩu mới */}
      {otp && (
        <form onSubmit={handleSubmitResetPassword}>
          <label>Nhập mã OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <label>Nhập mật khẩu mới:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={6}
            required
          />
          <button type="submit">Đổi mật khẩu</button>
        </form>
      )}
    </div>
    </div>
        </>
    )
}