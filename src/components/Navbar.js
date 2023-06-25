import React, { useContext } from 'react'
import './Navbar.css';
import AuthContext from '../context/AuthContext'
import logo from '../images/logo1.png'

function Navbar() {
  let { user, logoutUser } = useContext(AuthContext)


  return (
    <div id="navbar-backup-backup">
      <div class="nav-bb">
        <div class="nav-bb-left">
        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-3 logo-container">
          
          </div>
        </div>
        <div class="nav-bb-center" id="nav-bb-searchbar">
          <form method="get" action="/s/ref=nav_bb_sb" name="site-search" role="search" accept-charset="utf-8">
            <div class="nav-bb-center">
              <div class="nav-bb-search-wrapper">
                <input type="text" id="nav-bb-search" title="Search For" value="" name="field-keywords" autocomplete="off" />
              </div>
            </div>
            <input type="submit" value="Go" title="Go" class="nav-bb-button" />
          </form>
        </div>
        <div class="nav-bb-right">
        {user ? (
        <a onClick={logoutUser}>Logout</a>
      ) : (
        <>
          {/* <a href="/register">Register</a> */}
          <a href="/login">Login</a>
        </>
      )}

          <a href="/dashboard">Dashboard</a>
      
          <a href="/sell">Sell</a>
          <a href="/ListProduct">MyProducts</a>
          <a href="/settings">myprofile</a>
        </div>
        

      </div>

    </div>

  )
}

export default Navbar