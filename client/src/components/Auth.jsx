import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleOneTapLogin, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = ({ type }) => {
   const [data, setData] = useState({ userType: "user" });
   const [error, setError] = useState(false);

   const navigate = useNavigate();

   useEffect(() => {
      toast.error(error);
   }, [error]);

   const handleAuth = async () => {
      console.log(data);
      if (type === "signup") {
         try {
            let url = "https://thumbwave.onrender.com";
            if (data.userType === "user") {
               url += "/api/v1/user/create";
            } else if (data.userType === "creator") {
               url += "/api/v1/creator/create";
            }
            console.log(url);
            const response = await fetch(url, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(data),
            });
            const res = await response.json();
            console.log(response);
            if (response.ok) {
               localStorage.setItem("user", JSON.stringify(decoded));
               console.log(decoded);
               toast.success("Account created successfully");
               navigate("/profile");
            } else {
               toast.error("There was an error!");
            }
            console.log(res);
         } catch (error) {
            console.log(error);
            setError(true);
         }
      }
   };

   return (
      <div className="flex min-h-full gap-5 items-center justify-between w-full">
         <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center h-auto gap-20 p-10">
               <div className="flex flex-col items-start sm:items-center">
                  <h2 className="text-center font-bold text-6xl text-button-dark-bg">
                     {type === "signup" ? "Start Your Journey" : "Welcome Back!"}
                  </h2>
                  <p className="text-xl">
                     {type === "login"
                        ? "Your journey begins with a simple sign-in"
                        : "Create an account to get started"}
                  </p>
               </div>

               <div className="flex flex-col max-w-2xl w-full gap-4 bg-blend-darken bg-dark-bg-variant py-10 px-5 rounded-xl shadow-2xl">
                  <h3 className="text-3xl text-light-text text-center mb-5">
                     {type === "signup" ? "Sign Up" : "Sign In"}
                  </h3>
                  <div>
                     <div className="flex flex-col gap-2">
                        {type === "signup" && (
                           <div>
                              <label htmlFor="Name">Name</label>
                              <input
                                 type="text"
                                 name="Name"
                                 id="Name"
                                 value={data.name}
                                 onChange={(e) => setData({ ...data, name: e.target.value })}
                                 placeholder="Enter your Name"
                                 className="w-full p-3 border border-light-border bg-transparent outline-none px-4"
                              />
                           </div>
                        )}
                        <label htmlFor="email">Email Address</label>
                        <input
                           type="email"
                           name="email"
                           id="email"
                           value={data.email}
                           onChange={(e) => setData({ ...data, email: e.target.value })}
                           placeholder="Enter your registered email"
                           className="w-full p-3 border border-light-border  bg-transparent outline-none px-4"
                        />

                        <label htmlFor="password">Password</label>
                        <input
                           type="password"
                           name="password"
                           id="password"
                           placeholder="Enter your password"
                           value={data.password}
                           onChange={(e) => setData({ ...data, password: e.target.value })}
                           className="w-full p-3 border border-light-border  bg-transparent outline-none px-4"
                        />
                        <label htmlFor="password">Confirm Password</label>
                        <input
                           type="password"
                           name="confirm-password"
                           id="confirm-password"
                           value={data.confirmPassword}
                           onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                           placeholder="Re-enter your password"
                           className="w-full p-3 border border-light-border  bg-transparent outline-none px-4"
                        />

                        {type === "signup" && (
                           <div>
                              <p className="mb-2">Join as /</p>
                              <div className="flex gap-4">
                                 <label className="flex items-center">
                                    <input
                                       type="radio"
                                       name="userType"
                                       value="user"
                                       className="mr-2"
                                       onChange={(e) =>
                                          setData({ ...data, userType: e.target.value })
                                       }
                                       defaultChecked
                                    />
                                    User
                                 </label>
                                 <label className="flex items-center">
                                    <input
                                       type="radio"
                                       name="userType"
                                       value="creator"
                                       className="mr-2"
                                       onChange={(e) =>
                                          setData({ ...data, userType: e.target.value })
                                       }
                                    />
                                    Creator
                                 </label>
                              </div>
                           </div>
                        )}

                        <div className="flex justify-between mt-4">
                           <div>
                              <input
                                 type="checkbox"
                                 name="remember"
                                 id="remember"
                                 className="w-3 h-3 mr-2"
                              />
                              <label htmlFor="remember">Keep me signed in</label>
                           </div>
                           <div></div>
                           <a href="#" className="text-button-dark-bg">
                              Reset Password
                           </a>
                        </div>

                        <button
                           className="bg-button-bg px-6 py-2  shadow-lg text-white"
                           onClick={handleAuth}
                        >
                           Log In
                        </button>
                        <div className="text-center mt-4 items-center justify-center flex flex-col">
                           <p> - or -</p>
                           <GoogleLogin
                              onSuccess={(credentialResponse) => {
                                 const decoded = jwtDecode(credentialResponse.credential);
                                 localStorage.setItem("user", JSON.stringify(decoded));
                                 console.log(decoded);
                                 toast.success("Account created successfully");
                                 navigate("/profile");
                              }}
                              onError={() => {
                                 console.log("Login Failed");
                                 toast.error("Login Failed");
                              }}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="flex flex-col items-center justify-between max-w-xl w-full h-[90vh] bg-button-dark-bg rounded-xl shadow-2xl bg-opacity-95">
            <div className="flex gap-10 items-start justify-start w-full">
               <img
                  src="/Group.svg"
                  alt="Decorative top image"
                  className="w-60 opacity-50 rounded-lg"
               />
            </div>
            <div className="text-center text-white">
               <h3 className="text-3xl mb-5">
                  {type === "login" ? "New to Our Platform?" : "Already have an account?"}
               </h3>
               <p>Join our community today and unlock amazing features!</p>
               <button className="mt-4 bg-white text-button-dark-bg px-6 py-2  shadow-lg font-semibold">
                  {type === "login" ? (
                     <Link to="/signup">Sign Up</Link>
                  ) : (
                     <Link to="/login">Sign In</Link>
                  )}
               </button>
            </div>
            <div className="flex gap-10 items-end justify-end w-full">
               <img
                  src="/Group.svg"
                  alt="Decorative bottom image"
                  className="w-60 rotate-180 opacity-50 rounded-lg"
               />
            </div>
         </div>
      </div>
   );
};

export default Auth;
