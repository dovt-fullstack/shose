import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordPageProps {}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [otp, setOtp] = useState(""); // Mặc định mã OTP là 12345
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [checkC,setCheckC] = useState(false);
  const [checkOtp,setCheckOtp] = useState(false);
  const navigate = useNavigate()
  console.log("",history)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Gọi API để kiểm tra email và gửi mã OTP
      const dataReq = {
        mail : email
      }
      const response = await axios.post("http://localhost:8080/confirm-mail", dataReq);
      if (response.status) {
        setEmailSent(true);
        setCheckOtp(true)
      } else {
        setError("Email không tồn tại trong hệ thống.");
      }
    } catch (error :any) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        setError("Có lỗi từ phía server xảy ra.");
      } else if (error.request) {
        console.error("Request error:", error.request);
        setError("Yêu cầu không thành công.");
      } else {
        console.error("General error:", error.message);
        setError("Có lỗi xảy ra khi kiểm tra email.");
      }
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
       const dataReq = {
         mail: email,
         otp: Number(otp)
      }
      // Gọi API để xác nhận mã OTP
      const response = await axios.post(
        "http://localhost:8080/check-otp",
      dataReq
      );
        console.log(response,"response")
      if (response.data.status == true) {
        setCheckC(true)
        setCheckOtp(false)

      } else {
      setError("Mã xác nhận không hợp lệ ");

      }
    } catch (error) {
      setError("Mã xác nhận không hợp lệ hoặc có lỗi xảy ra.");
    }
  };

  // const url = useHistory()

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      // Gọi API để đổi mật khẩu
      const response = await axios.patch(
        "http://localhost:8080/api/auth/resetpassword",
        { email, newPassword, confirmPassword }
      );

      if (response.data.message === "Mật khẩu đã được đổi thành công.") {
        alert("Đã Đổi Pass Thành Công")
        // Xử lý khi đổi mật khẩu thành công
        console.log("Password changed successfully!");
        // url.push('/')
        setTimeout(() => {
          navigate('/')
        }, 450);
        // Điều hướng tới trang thông báo đổi mật khẩu thành công
        // Ví dụ: history.push('/password-changed');
      }
    } catch (error) {
      setError("Có lỗi xảy ra khi đổi mật khẩu.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    {!emailSent ? (
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Gửi
        </button>
      </form>
    ) : (
    <></>

    )}
  {checkOtp &&   <form onSubmit={handleOtpSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Nhập mã OTP:</label>
        <input
          type="text"
          onChange={(e) => setOtp(e.target.value)}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Xác nhận OTP
        </button>
      </form>}
    {checkC && (
      <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
        <label className="block text-sm font-medium text-gray-700">Nhập mật khẩu mới:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
        <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Đổi mật khẩu
        </button>
      </form>
    )}

    {error && <p className="text-red-500">{error}</p>}
  </div>
  );
};

export default ForgotPasswordPage;

// import React, { useState } from 'react';
// import axios from 'axios';

// const ForgotPasswordPage = () => {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP, Step 3: Enter new password

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setOtp(e.target.value);
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewPassword(e.target.value);
//   };

//   const handleSendOTP = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/auth/forgotpassword', { email });
//       setMessage(response.data.message);
//       setStep(2); // Move to step 2: Enter OTP
//     } catch (error :any) {
//       setMessage(error.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại.');
//     }
//   };

//   const handleVerifyOTP = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/auth/otpauthentication', { email, otp });
//       setMessage(response.data.message);
//       if (response.data.message === 'Mã OTP xác nhận thành công.') {
//         setStep(3); // Move to step 3: Enter new password
//       }
//     } catch (error:any) {
//       setMessage(error.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại.');
//     }
//   };

//   const handleChangePassword = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/user/changePassword', { email, newPassword });
//       setMessage(response.data.message);
//       setStep(1); // Reset to step 1 after password change
//     } catch (error:any) {
//       setMessage(error.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl mb-4">Quên mật khẩu</h1>
//       {step === 1 && (
//         <>
//           <input
//             type="email"
//             placeholder="Nhập email của bạn"
//             value={email}
//             onChange={handleEmailChange}
//             className="p-2 border rounded mb-4"
//           />
//           <button onClick={handleSendOTP} className="p-2 bg-blue-500 text-white rounded">
//             Gửi mã OTP
//           </button>
//         </>
//       )}
//       {step === 2 && (
//         <>
//           <input
//             type="text"
//             placeholder="Nhập mã OTP"
//             value={otp}
//             onChange={handleOtpChange}
//             className="p-2 border rounded mb-4"
//           />
//           <button onClick={handleVerifyOTP} className="p-2 bg-blue-500 text-white rounded">
//             Xác nhận mã OTP
//           </button>
//         </>
//       )}
//       {step === 3 && (
//         <>
//           <input
//             type="password"
//             placeholder="Nhập mật khẩu mới"
//             value={newPassword}
//             onChange={handlePasswordChange}
//             className="p-2 border rounded mb-4"
//           />
//           <button onClick={handleChangePassword} className="p-2 bg-green-500 text-white rounded">
//             Đổi mật khẩu
//           </button>
//         </>
//       )}
//       {message && <p className="mt-4">{message}</p>}
//     </div>
//   );
// };

// export default ForgotPasswordPage;

