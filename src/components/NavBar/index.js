import "./index.css"
import {NavLink} from "react-router-dom"
import {AiFillHome,AiOutlineTransaction} from "react-icons/ai"
import {FiLogOut} from "react-icons/fi"
import {CgProfile} from "react-icons/cg"
import React from 'react';
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const NavBar=()=>{
    const cookiData=Cookies.get("user")
    const userId = JSON.parse(cookiData);

const history=useNavigate()
   const LogoutFunction=()=>{
     Cookies.remove("authenticate");
     history("/")
   } 
    return(
        <nav className="nav-container">
         <img src="https://res.cloudinary.com/ccbp-tech-surya/image/upload/v1690705826/Frame_507_dmtepm.png" alt="logo" className="logo-image" />
         <div className="icon-container">
            <NavLink to="/Dashboard">
            <div className="nav-items">
            <AiFillHome className="icons"/>
            <span>Dashboard</span>
            </div></NavLink>
            <NavLink to="/transaction">
            <div className="nav-items">
                <AiOutlineTransaction className="icons"/>
                {userId.id===3?<span>All Transacation</span>:<span>Transacation</span>}
            </div></NavLink>
            <NavLink to="/profile">
            <div className="nav-items">
                <CgProfile className="icons"/>
                <span>Profile</span>
            </div></NavLink>
         </div>
         <div className="logout"> 
         <img src="https://s3-alpha-sig.figma.com/img/57d3/d250/790e98129931897251abd3915a931233?Expires=1691971200&Signature=YpaWRkaWOMdRC5HT4eTffn-NvDJxxf87hiX0hFvxbYrqmtXgzo2fy1v7-1j3fhGi1i2q8E2sBQ3sDg38jHyhS5UEBGcES6qoFsHXcB0zNpah~C8kKu61euDChDEf2US2RTAKAcyLo41iXSSFuvbwDXp2MKzdu8EPzResV9XNbvy6MC493bdr94WOIT1~c9tQDEBFLnj7xFgchyvFQIbHiVVJGE9l30oM3Lv0h~k-gTag6a-1YqHa502qT0ujMMQ6Lo1QTPnMx2vJHQhhr5CB2s0hgiHyfNLTg44Nz-sqV0-kgBp~2gUgXdRTCA-FrM3noqjsRX1eQxDQxqs7fZfeEQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="profile-logo" className='logout-logo' />
    <div>
        <p className="logout-para">sai</p>
        <p className="logout-para">sai@123</p></div>
       
        <Popup
     modal
     trigger={
        <button className="logout-button">
        <FiLogOut/>
        </button>
     }
   >
     {close => (
       <>
         <div className="delete-container">
         <FiLogOut className="logout-button" />
          <div>
           <p className="delete-content">Are you sure you want to logout?</p>
           <p className="delete-para">This transaction will be deleted immediately. You can’t undo this action.</p>
           </div>
          
         </div>
         <div className="button-container">
         <button className="delete-button"  onClick={() => LogoutFunction(close)}>yes Logout</button>
         <button
           type="button"
           className="trigger-button"
           onClick={() => close()}
         >
           No leave it
         </button></div>
       </>
     )}
   </Popup>
         </div>
        </nav>    )
}
export default NavBar