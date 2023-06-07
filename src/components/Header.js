import React , {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div>
            <Link to="/">Home</Link>
            <span> | </span>
            {user ? (
                <button onClick={logoutUser}>logout</button>
            ):(
                <>
                    <Link to="/login">login</Link>
                    <Link to="/register">register</Link>
                </>
            )}
        </div>
    )
}

export default Header