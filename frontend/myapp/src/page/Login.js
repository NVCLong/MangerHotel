import {useState} from "react";
import{useNavigate} from "react-router-dom";
import axios from "axios";


export default function Login(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const regex=/[^\s@]+@[^\s@]+\.[^\s@]+/gi

    const navigator= useNavigate()


    function handleInputUsername(e) {
     setEmail(e.target.value)
    }

    function handleInputPassword(e) {
        setPassword(e.target.value)
    }

    function changeRegister(e) {
        e.preventDefault();
        navigator("/register")

    }
    async function  handleSubmit(e){
        e.preventDefault();
        if(password.length<5){
            alert("Please enter password again")
        }else {
            let user= {
                email:email,
                password:password
            }
            const response= await axios.post("http://localhost:8080/api/v1/auth/register",user)
            console.log(response.data)
            localStorage.setItem("access_token",response.data.access_token);
            document.cookie=`refresh_token=${response.data.refresh_token}`
        }
    }

    return(

            <div className="flex w-full h-screen">
                <div className="w-full flex items-center justify-center">
                    <div className="bg-white px-10 py-20 rounded-3xl border-3 border-gray-200">
                        <h1 className="text-5xl font-semibold"> Welcome back</h1>
                        <p className="font-medium text-lg text-gray-500 mt-4"> Welcome back! Please enter your
                            details</p>
                        <form className="mt-8" >
                            <div className="mb-2">
                                <label className="text-lg font-medium "> Email </label>
                                <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-3 bg-transparent"
                                       type="email"
                                       placeholder="Enter your username" value={email}
                                       onChange={handleInputUsername}/>
                            </div>
                            <div>
                                <label className="text-lg font-medium "> Password </label>
                                <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-3 bg-transparent"
                                       type="text"
                                       placeholder="Enter your password" value={password}
                                       onChange={handleInputPassword}/>
                            </div>
                            <div className="mt-8 flex justify-between items-center">
                                <div>
                                    <button className="font-medium text-base text-redd-300"
                                            onClick={changeRegister}>Register
                                    </button>
                                </div>
                                <button className="font-medium text-base text-red-300">Forgot password</button>
                            </div>
                            <div className="mt-8 flex flex-col gap-y-4">
                                <button
                                    className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-red-300 text-white text-lg font-bold"
                                    type="submit"
                                    onClick={handleSubmit}
                                > Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="hiden relative w-1/2 lg:flex h-full items-center justify-center bg-gray-200">
                    <div
                        className="w-60 h-60 bg-gradient-to-tr from-red-300 to-pink-500 rounded-full animate-bounce"></div>
                    <div className="w-full h-1/2 absolute bg-white/10 backdrop-blur-lg"></div>
                </div>
        </div>
    )
}