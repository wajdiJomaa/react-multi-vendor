import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    
    let local_at = () =>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem("authTokens")) : null
    let local_user = ()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem("authTokens")) : null
    let [authTokens, setAuthTokens] = useState(local_at)
    let [user, setUser] = useState(local_user)
    let [loading,setLoading] = useState(true)

    const navigate = useNavigate()

    let loginUser = async (e) =>{
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/',
                            {
                                method:'POST',
                                headers:{
                                    'Content-Type':'application/json'
                                },
                                body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
                            }
                            )
        let data = await response.json()
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate('/')
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        
        if (!loading) 
            navigate('/')
    }

    let contextData = {
        user: user,
        loginUser:loginUser,
        logoutUser:logoutUser
    }   

    let updateToken = async () => {
        if (!authTokens) return

        console.log("Token Updated")
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/',
                            {
                                method:'POST',
                                headers:{
                                    'Content-Type':'application/json'
                                },
                                body: JSON.stringify({'refresh':authTokens.refresh})
                            }
                            )
        let data = await response.json()
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        }else{
            logoutUser()
        }
    }

    useEffect(()=>{

        if (loading){
            updateToken()
            setLoading(false)
        }
        else{
            let minutes = 14 * 60 * 1000
            let interval = setInterval(()=>{
                if(authTokens){
                    updateToken()
                }
            }, minutes)
        return  ()=> clearInterval(interval)
        }
    }, [authTokens])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}