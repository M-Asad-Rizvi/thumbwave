import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleOneTapLogin, GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../context/UserContext";

const SignUp = () => {
   const navigate = useNavigate();
   const { isLoggedIn, setIsLoggedIn } = useUser();

   const [data, setData] = useState({});
   const [error, setError] = useState(false);
   const [vibrate, setVibrate] = useState(false);
   const [page, setPage] = useState(1);
   console.log(page);

   const buttonRef = useRef(null);

   useEffect(() => {
      toast.error(error);
   }, [error]);

   const handleVibrate = () => {
      buttonRef.current.disabled = true;
      buttonRef.current.classList.add("shake-button");
      setTimeout(() => {
         buttonRef.current.disabled = false;
         buttonRef.current.classList.remove("shake-button");
         setVibrate(false);
      }, 1000);
      setVibrate(true);
   };

   const emailValidation = (email) => {
      const re =
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
   };

   const handleGoogleSignUp = async (decodedUser) => {
      try {
         const response = await fetch("/api/v1/user/google", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(decodedUser),
         });

         if (response.ok) {
            const res = await response.json();
            console.log(res);

            toast.success("Login successful");
            setIsLoggedIn(true);
            navigate("/app/dashboard");
         }
      } catch (error) {
         setIsLoggedIn(false);
         toast.error(error);
      }
   };

   const handleAuth = async () => {
      try {
         if (page === 1) {
            if (!data.name) {
               toast.error("Enter your name!");
               handleVibrate();
               return;
            }
            if (!data.email) {
               toast.error("Enter your email!");
               handleVibrate();
               return;
            }
            if (!emailValidation(data.email)) {
               toast.error("Enter valid email address!");
               handleVibrate();
               return;
            }

            setPage(2);
            return;
         }
         if (page === 2) {
            if (!data.password) {
               toast.error("Enter your password!");
               handleVibrate();
               return;
            }
            if (data.password.length < 8) {
               toast.error("Password must be at least 8 characters long!");
               handleVibrate();
               return;
            }
            if (data.password !== data.confirmPassword) {
               toast.error("Passwords do not match!");
               handleVibrate();
               return;
            }
         }

         try {
            console.log(data, "A log in request was sent to the server");

            const response = await fetch("/api/v1/user/create", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(data),
            });

            if (response.ok) {
               const res = await response.json();
               if (res.success) {
                  toast.success("Account created successfully");
                  setIsLoggedIn(true);
                  navigate("/profile");
               }
            }

            if (!response.ok) {
               const res = await response.json();
               console.log(res);
               toast.error(res.message);
               setIsLoggedIn(false);
            }
         } catch (error) {
            toast.error(error);
         }
      } catch (error) {
         toast.error(error);
      }
   };

   if (!isLoggedIn) {
      useGoogleOneTapLogin({
         onSuccess: (res) => {
            // decode before sending
            const decoded = jwtDecode(res.credential);
            handleGoogleSignUp(decoded);
         },
         onError: (error) => {
            console.log(error);
         },
      });
   }

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            duration: 0.3,
            when: "beforeChildren",
            staggerChildren: 0.4,
         },
      },
   };

   const itemVariants = {
      hidden: { y: 50, x: 10, opacity: 0 },
      visible: {
         y: 0,
         x: 0,
         opacity: 1,
         transition: { type: "spring", stiffness: 100, duration: 0.3 },
      },
   };

   return (
      <motion.div
         className="flex min-h-full gap-5 items-center justify-between w-full flex-row-reverse"
         initial="hidden"
         animate="visible"
         variants={containerVariants}
      >
         <motion.div className="flex flex-col items-center justify-center" variants={itemVariants}>
            <div className="flex flex-col items-center h-auto gap-20 p-10">
               <motion.div
                  className="flex flex-col items-start sm:items-center"
                  variants={itemVariants}
               >
                  <h2 className="text-center font-bold text-6xl text-button-dark-bg">
                     Get Started Today
                  </h2>
                  <p className="text-xl">
                     Create an account to get started with{" "}
                     <b className="text-button-bg">Thumbwave</b>
                  </p>
               </motion.div>

               <motion.div
                  className="flex flex-col max-w-2xl w-full gap-4 bg-blend-darken bg-dark-bg-variant py-10 px-5 rounded-xl shadow-2xl"
                  variants={itemVariants}
               >
                  <h3 className="text-3xl text-light-text text-center mb-5">Sign Up</h3>
                  <div>
                     <div className="flex flex-col gap-2">
                        {page === 1 && (
                           <>
                              <motion.label htmlFor="name" variants={itemVariants}>
                                 Name
                              </motion.label>
                              <motion.input
                                 type="text"
                                 name="name"
                                 id="name"
                                 value={data.name}
                                 onChange={(e) => setData({ ...data, name: e.target.value })}
                                 placeholder="Enter your name"
                                 className="w-full p-3 border border-light-border  bg-transparent outline-none px-4"
                                 variants={itemVariants}
                              />
                              <motion.label htmlFor="email" variants={itemVariants}>
                                 Email Address
                              </motion.label>
                              <motion.input
                                 type="email"
                                 name="email"
                                 id="email"
                                 value={data.email}
                                 onChange={(e) => setData({ ...data, email: e.target.value })}
                                 placeholder="Enter your registered email"
                                 className="w-full p-3 border border-light-border  bg-transparent outline-none px-4"
                                 variants={itemVariants}
                              />
                           </>
                        )}

                        {/* Password and confirm password */}
                        {page === 2 && (
                           <>
                              <motion.label htmlFor="password" variants={itemVariants}>
                                 Password
                              </motion.label>
                              <motion.input
                                 type="password"
                                 name="password"
                                 id="password"
                                 placeholder="Enter your password"
                                 value={data.password}
                                 onChange={(e) => setData({ ...data, password: e.target.value })}
                                 className="w-full p-3 border border-light-border  bg-transparent outline-none px-4"
                                 variants={itemVariants}
                              />
                              <motion.label htmlFor="confirmPassword" variants={itemVariants}>
                                 Confirm Password
                              </motion.label>
                              <motion.input
                                 type="password"
                                 name="confirmPassword"
                                 id="confirmPassword"
                                 placeholder="Confirm your password"
                                 value={data.confirmPassword}
                                 onChange={(e) =>
                                    setData({ ...data, confirmPassword: e.target.value })
                                 }
                                 className="w-full p-3 border border-light-border  bg-transparent outline-none px-4"
                                 variants={itemVariants}
                              />
                           </>
                        )}

                        {page >= 2 && (
                           <>
                              <motion.div
                                 className="flex justify-between mt-4"
                                 variants={itemVariants}
                              >
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
                                 <Link to="/reset-password" className="text-button-dark-bg">
                                    Reset Password
                                 </Link>
                              </motion.div>
                           </>
                        )}
                        <motion.button
                           ref={buttonRef}
                           className="bg-button-bg px-6 py-2 shadow-lg text-white mt-3"
                           onClick={handleAuth}
                           variants={itemVariants}
                           whileTap={{ scale: 0.95 }}
                        >
                           {page < 2 ? "Next" : "Sign In"}
                        </motion.button>
                        <motion.div
                           className="text-center mt-4 items-center justify-center flex flex-col"
                           variants={itemVariants}
                        >
                           <p> - or -</p>
                           <GoogleLogin
                              onSuccess={async (credentialResponse) => {
                                 const decoded = jwtDecode(credentialResponse.credential);
                                 handleGoogleSignUp(decoded);
                              }}
                              onError={() => {
                                 console.log("Login Failed");
                                 toast.error("Login Failed");
                              }}
                           />
                        </motion.div>
                     </div>
                  </div>
               </motion.div>
            </div>
         </motion.div>
         <motion.div
            className="flex flex-col items-center justify-between max-w-xl w-full h-[90vh] bg-button-dark-bg rounded-xl shadow-2xl bg-opacity-95"
            variants={itemVariants}
         >
            <motion.div
               className="flex gap-10 items-start justify-start w-full"
               variants={itemVariants}
            >
               <img
                  src="/Group.svg"
                  alt="Decorative top image"
                  className="w-60 opacity-50 rounded-lg"
               />
            </motion.div>
            <motion.div className="text-center text-white" variants={itemVariants}>
               <h3 className="text-3xl mb-5">Already have an account?</h3>
               <p>Join our community today and unlock amazing features!</p>
               <Link to="/login">
                  <motion.button
                     className="mt-4 bg-white text-button-dark-bg px-6 py-2 shadow-lg font-semibold"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                  >
                     Sign In
                  </motion.button>
               </Link>
            </motion.div>
            <motion.div
               className="flex gap-10 items-end justify-end w-full"
               variants={itemVariants}
            >
               <img
                  src="/Group.svg"
                  alt="Decorative bottom image"
                  className="w-60 rotate-180 opacity-50 rounded-lg"
               />
            </motion.div>
         </motion.div>
      </motion.div>
   );
};

export default SignUp;
