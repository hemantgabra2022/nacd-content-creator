import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import iconApple from "../../assets/img/cib-apple.svg";
import iconEye from "../../assets/img/eyeicon.svg";
import iconFb from "../../assets/img/facebook-ic.svg";
import iconGoogle from "../../assets/img/google-ic.svg";
import iconLine from "../../assets/img/line-2.svg";
import logo from "../../assets/img/nacd_logo.png";



export const Login = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [userEmailID, setUserEmailID] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        email: userEmailID,
        password: userPassword,
  }
      // Make a POST request to your server endpoint
      const response = await axios.post(`${apiUrl}/api/v1/auth/login`, queryString.stringify(formData), {
        
      });

      // Handle the response, e.g., store user token in state or localStorage
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user_id);
      
      navigate('/unitlessions')
      

      // Redirect or perform any other action on successful login
    } catch (error) {
      // Handle login failure, e.g., show an error message
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="bg-[#f8f8f8] flex flex-row justify-center w-full">
      
        <div className="w-[524px] h-[645px] my-[20px] bg-[#ffffff] relative rounded-[8px]">
          <div className="flex items-center justify-center text-center w-full">
            <img src={logo} alt="NACD" width="30%" className="top-[10px] absolute" />
          </div>
          <div className="absolute w-[386px] h-[545px] top-[118px] left-[71px]">
            <div className="absolute top-0 left-[150px] font-medium text-inkdarkest text-[24px] tracking-[0] leading-[normal]">
              Sign in
            </div>
            <form onSubmit={handleLogin}>
              <div className="absolute w-[384px] h-[56px] top-[66px] left-0">
                <input
              onChange={(e) => setUserEmailID(e.target.value)}
              name="mailID"
              value={userEmailID}
              placeholder="Enter your email"
              className="px-5 box-border w-[382px] h-[56px] bg-[#f7f8f9] border border-solid border-border relative rounded-[8px] text-gray text-[14px]"
              type="text"
            />
              </div>
              <div className="absolute w-[384px] h-[83px] top-[142px] left-0">
                <div className="absolute w-[384px] h-[56px] top-0 left-0">
                  <div className="relative w-[382px] h-[56px] bg-[#f6f7f8] rounded-[8px] border border-solid border-border">
                    <img
                      className="absolute w-[22px] h-[22px] top-[17px] left-[343px]"
                      alt="Fluent eye filled"
                      src={iconEye}
                    />

                    <input
              name="password"
              className="px-5 box-border w-[382px] h-[56px] bg-[#f7f8f9] border border-solid border-border relative rounded-[8px] text-gray text-[14px]"
              placeholder="Enter your password"
              type="password"
              onChange={(e) => setUserPassword(e.target.value)}
            />
                  </div>
                </div>
                <div className="absolute top-[65px] w-full flex items-baseline justify-between">
                  <span className="text-[14px] text-red-500 hidden">
                    Please check your credentails
                  </span>
                  <Link
                    className="w-full font-medium text-dark-gray text-[14px] text-right tracking-[0] leading-[normal]"
                    to="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="cursor-pointer text-[#ffffff] no-underline w-full relative w-fit font-medium text-[16px] tracking-[0] leading-[normal] flex w-[382px] h-[56px] items-center justify-center gap-[10px] p-[10px] absolute top-[255px] left-0 bg-[#161f6e] rounded-[8px]"
              >
                Continue
                
              </button>
            </form>
            <div className="absolute w-[331px] h-[95px] top-[341px] left-[26px]">
              <div className="absolute w-[105px] h-[56px] top-[39px] left-[113px] bg-white rounded-[8px] border border-solid border-border">
                <img
                  className="absolute w-[26px] h-[26px] top-[14px] left-[36px]"
                  alt="Google ic"
                  src={iconGoogle}
                />
              </div>
              <div className="absolute w-[105px] h-[56px] top-[39px] left-0 bg-white rounded-[8px] border border-solid border-border">
                <img
                  className="absolute w-[26px] h-[26px] top-[14px] left-[36px]"
                  alt="Facebook ic"
                  src={iconFb}
                />
              </div>
              <div className="absolute w-[105px] h-[56px] top-[39px] left-[226px] bg-white rounded-[8px] border border-solid border-border">
                <img
                  className="absolute w-[26px] h-[26px] top-[14px] left-[36px]"
                  alt="Cib apple"
                  src={iconApple}
                />
              </div>
              <div className="absolute w-[333px] h-[17px] top-0 left-0">
                <div className="absolute top-0 left-[124px] [font-family:'Urbanist',Helvetica] font-semibold text-dark-gray text-[14px] tracking-[0] leading-[normal]">
                  Or Login with
                </div>
                <img
                  className="w-[112px] left-0 absolute h-px top-[8px] object-cover"
                  alt="Line"
                  src={iconLine}
                />
                <img
                  className="w-[111px] left-[220px] absolute h-px top-[8px] object-cover"
                  alt="Line"
                  src={iconLine}
                />
              </div>
            </div>
            <p className="absolute top-[460px] left-[56px] [font-family:'Poppins',Helvetica] font-normal text-transparent text-[14px] text-center tracking-[0.14px] leading-[19.6px] whitespace-nowrap">
              <span className="font-medium text-neutral-800">
                Don’t have an account?
              </span>
              <span className="[font-family:'Urbanist',Helvetica] font-medium text-neutral-800 text-[15px] tracking-[0.15px] leading-[21.0px]">
                &nbsp;
              </span>
              
                <Link className="font-medium text-[#161f6e] no-underline" to="/register">Register Now</Link>
              
            </p>
          </div>
        </div>
      
    </div>
  );
};

export default Login;
