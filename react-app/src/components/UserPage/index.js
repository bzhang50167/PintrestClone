import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import OpenModalButton from "../OpenModalButton"
import './user.css'
import { useEffect } from "react"
import { addFollowersThunk, getAllUserThunk, removeFollowerThunk } from "../../store/session"
import BoardForm from "../Boards/BoardForm"
import EditUserModal from "../EditUserModal"
import Loadingpage from "../loadingpage"
import { FaPlus, FaMinus } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom"


const UserPage = () => {
    const { id } = useParams()
    const user = useSelector(state => state.session.allUser)
    const userer = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(getAllUserThunk())
    }, [dispatch])

    const handleAdd = (e) => {
        e.preventDefault()
        dispatch(addFollowersThunk(userer.id, id))
    }

    const handleRemove = (e) => {
        e.preventDefault()
        dispatch(removeFollowerThunk(userer.id, id))
    }

    if (!user) {
        return <Loadingpage />
    }

    const isFollowing = userer.following.includes(user[id].id);
    console.log(isFollowing);
    return (
        <div className="page">
            <div className="page">
                <div>
                    {user[id].profilePic !== null ? (
                        <img className="profile-image" src={user[id].profilePic} />
                    ) : <img className="profile-image" src="https://mangterest-pic.s3.amazonaws.com/11109d2e46ec49e2b8ca2eaa57bb3f86.jpg" />
                    }
                    {!isFollowing && user[id].email !== userer.email ? (
                        <button className="followbutton" onClick={handleAdd}><FaPlus /> </button >
                    ) : null}
                    {isFollowing && user[id].email !== userer.email ? (
                        <button className="followbutton" onClick={handleRemove}><FaMinus /> </button >
                    ) : null}
                    <div className="nameofuser">
                        {user[id].firstName} {user[id].lastName}
                    </div>
                    <div className="username">
                        @{user[id].username}
                    </div>
                    {user[id].email === userer.email ? (
                    <div className="following" onClick={e => history.push('/following')}>
                        following {user[id].following.length} user
                    </div>
                    ): null}
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
