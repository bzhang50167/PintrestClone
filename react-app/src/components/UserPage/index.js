import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import OpenModalButton from "../OpenModalButton"
import './user.css'
import { useState } from "react"

const UserPage = () => {
    const user = useSelector(state => state.session.user)
    const { id } = useParams()
    const [classname, setClassname] = useState('')
    console.log(classname ,'is it changing');
    // console.log(user, 'user');
    // console.log(id, 'param id');
    return (
        <div className="page">
            <div className="page">
                <div>
                    <img className="profile-image" src={user.profilePic} />
                    <div className="nameofuser">
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="username">
                        @{user.username}
                    </div>
                    {user.id === +id ? (
                        <div className="outeredit">
                            <div className="editbutton">
                                <button className="button">
                                    <OpenModalButton
                                        buttonText='Edit Profile'
                                    />
                                </button>
                            </div>
                            <div className="editbutton">
                                <button className="button">
                                    <OpenModalButton
                                        buttonText='Create Board'
                                    />
                                </button>
                            </div>
                        </div>
                    ) : ''}
                </div>
            </div>
        </div>
    )
}

export default UserPage
