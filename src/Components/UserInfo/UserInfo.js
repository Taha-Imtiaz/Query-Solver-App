import React from 'react'
import "./UserInfo.css"

const UserInfo = (props) => {
    var {user} = props;
    return (
        <div className = " user-info flex">
             <h2 className = "flex">User Profile</h2>
           <h2 className = "flex">{`Usename :${user.fullname}`}</h2>
            <h2 className = "flex">{`Email :${user.email}`}</h2>  
        </div>
    )
}

export default UserInfo
