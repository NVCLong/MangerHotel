import {useState} from "react";
import{useNavigate} from "react-router-dom";


export default function Login(){
    const [username,setUserName]=useState("")
    const [password,setPassword]=useState("")
    const regex=/[^\s@]+@[^\s@]+\.[^\s@]+/gi

    const navigator= useNavigate()


    function handleInputUsername(e) {
     setUserName(e.target.value)
    }

    function handleInputPassword(e) {
        setPassword(e.target.value)
    }

    function changeRegister(e) {
        e.preventDefault();
        navigator("/register")

    }
    function handleSubmit(e){
        e.preventDefault();
        if(password.length<5){
            alert("Please enter password again")
        }else {
            let user= {
                username:username,
                password:password
            }
            console.log(user)
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
                                <label className="text-lg font-medium "> Username </label>
                                <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-3 bg-transparent"
                                       type="text"
                                       placeholder="Enter your username" value={username}
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