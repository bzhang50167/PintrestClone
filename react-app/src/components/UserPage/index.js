import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import OpenModalButton from "../OpenModalButton"
import './user.css'
import { useEffect, useState } from "react"
import { getAllUserThunk } from "../../store/session"
import BoardForm from "../Boards/BoardForm"
import EditUserModal from "../EditUserModal"

const UserPage = () => {
    const user = useSelector(state => state.session.allUser)
    const userer = useSelector(state => state.session.user)
    const { id } = useParams()
    const [classname, setClassname] = useState('')
    const dispatch = useDispatch()
    console.log(classname ,'is it changing');
    console.log(typeof(id));
    // console.log(user, 'user');
    // console.log(id, 'param id');
    useEffect(() => {
        dispatch(getAllUserThunk())
    }, [dispatch])

    if(!user){
        return null
    }
    return (
        <div className="page">
            <div className="page">
                <div>
                    <img className="profile-image" src={user[id].profilePic} />
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
                                        modalComponent={<EditUserModal id={id}/> }
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
