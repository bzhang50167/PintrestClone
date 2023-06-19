import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import OpenModalButton from "../OpenModalButton"
import './user.css'
import { useEffect, useState } from "react"
import { getAllUserThunk } from "../../store/session"
import BoardForm from "../Boards/BoardForm"
import EditUserModal from "../EditUserModal"
import Loadingpage from "../loadingpage"

const UserPage = () => {
    const user = useSelector(state => state.session.allUser)
    const userer = useSelector(state => state.session.user)
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUserThunk())
    }, [dispatch])

    if (!user) {
        return <Loadingpage />
    }
    return (
        <div className="page">
            <div className="page">
                <div>
                    {user[id].profilePic !== null ? (
                        <img className="profile-image" src={user[id].profilePic} />
                    ) : <img className="profile-image" src="https://mangterest-pic.s3.amazonaws.com/11109d2e46ec49e2b8ca2eaa57bb3f86.jpg" />
                    }
                    <div className="nameofuser">
                        {user[id].firstName} {user[id].lastName}
                    </div>
                    <div className="username">
                        @{user[id].username}
                    </div>
                    {userer.id === +id ? (
                        <div className="outeredit">
                            <div className="editbutton">
                                <OpenModalButton
                                    buttonText='Edit Profile'
                                    modalComponent={<EditUserModal id={id} />}
                                />
                            </div>
                            <div className="editbutton">
                                <OpenModalButton
                                    buttonText='Create Board'
                                    modalComponent={<BoardForm id={id} />}
                                />
                            </div>
                        </div>
                    ) : ''}
                </div>
            </div>
        </div>
    )
}

export default UserPage
