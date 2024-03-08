import {useState} from "react";
import {flushSync} from "react-dom";
import{useNavigate} from "react-router-dom";


export  default  function Register(){
    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")
    const [email, setEmail]= useState("")
    const navigator= useNavigate();
    const regex=/[^\s@]+@[^\s@]+\.[^\s@]+/gi
    const handleInputUsername=(e)=>{
        setUsername(e.target.value)
    }
    const handleInputPassword=(e)=>{
        setPassword(e.target.value)
    }
    const handleInputEmail=(e)=>{
        setEmail(e.target.value)
    }
    const handleSubmit= (e)=>{
        e.preventDefault();
        if(email.match(regex)===false){
            alert("Please enter a valid email")
        }else{
            if(password.length<5){
                alert("Password must be at least 5 characters")
            }else {
                let user={
                    username: username,
                    email:email,
                    password:password
                }
                console.log(user);
                navigator("/")
            }
        }
    }

    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center">
                <div className="bg-white px-10 py-20 rounded-3xl border-3 border-gray-200">
                    <h1 className="text-5xl font-semibold"> Welcome </h1>
                    <p className="font-medium text-lg text-gray-500 mt-4">Welcome, Please sign up for free account </p>
                    <form className="mt-8">
                        <div className="mb-2">
                            <label className="text-lg font-medium "> Username </label>
                            <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-3 bg-transparent"
                                   type="text"
                                   placeholder="Enter your username" value={username}
                                   onChange={handleInputUsername}/>
                        </div>
                        <div className="mb-2">
                            <label className="text-lg font-medium "> Email </label>
                            <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-3 bg-transparent"
                                   type="email"
                                   placeholder="Enter your username" value={email}
                                   onChange={handleInputEmail}/>
                        </div>
                        <div>
                            <label className="text-lg font-medium "> Password </label>
                            <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-3 bg-transparent"
                                   type="password"
                                   placeholder="Enter your password" value={password}
                                   onChange={handleInputPassword}/>
                        </div>
                        <div className="mt-8 flex flex-col gap-y-4">
                            <button
                                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-red-300 text-white text-lg font-bold"
                                type="submit"
                                onClick={handleSubmit}
                            > Sign up
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
    );
}