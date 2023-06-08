import React, { useContext } from 'react'
import './Navbar.css';
import AuthContext from '../context/AuthContext'

function Navbar() {
  let { user, logoutUser } = useContext(AuthContext)
  return (
    <div id="navbar-backup-backup">
      <div class="nav-bb">
        <div class="nav-bb-left">
          <a
            id="nav-bb-logo"
            href="/ref=nav_bb_logo"
            style={{
              backgroundImage: `url("https://images-na.ssl-images-amazon.com/images/G/01/gno/images/general/backup-logo_blue_2x._CB481604563_.png")`,
              backgroundSize: '110px 35px'
            }}
          >
            Multishop
          </a>
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
            <a href={logoutUser}>logout</a>) : (
            <>
              <a href="/register">Register</a>
              <a href="/login">Login</a>
            </>)
          }
          <a href="/gp/help/customer/display.html/ref=nav_bb_help" class="nav-bb-lr-divider">Help</a>
          <a href="/gp/cart/view.html/ref=nav_bb_cart">Cart</a>
          <a href="/registervendor">Sell</a>
        </div>


      </div>

    </div>

  )
}

export default Navbar