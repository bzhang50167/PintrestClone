import { useDispatch, useSelector } from "react-redux"
import './follow.css'
import { useEffect } from "react"
import { getAllUserThunk, removeFollowerThunk } from "../../store/session"
import Loadingpage from "../loadingpage"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const ShowFollowing = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const allUser = useSelector(state => state.session.allUser)
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllUserThunk())
    }, [dispatch])
    if (!user || !allUser) {
        return <Loadingpage />
    }
    return (
        <div>
            <h3>Following:</h3>
            <div className="following-page">
                <div className="following-page">
                    {user.following.map(id => {
                        return (
                            <div className="main-box">
                                <div>
                                    <img onClick={e => history.push(`/user/${id}`)} className="follower-image" src={allUser[id].profilePic} />
                                </div>
                                <div>
                                    <div className="username">
                                        {allUser[id].username}
                                    </div>
                                    <div className="bottomdiv">
                                        <div className="username">
                                            {allUser[id].firstName} {allUser[id].lastName}
                                        </div>
                                        <div>
                                            <button onClick={e => dispatch(removeFollowerThunk(user.id, id))}>remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ShowFollowing
