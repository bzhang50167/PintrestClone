import { useDispatch, useSelector } from "react-redux"
import './followers.css'
import { useEffect } from "react"
import { getAllUserThunk, removeFollowerThunk } from "../../store/session"
import Loadingpage from "../loadingpage"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const ShowFollowers = () => {
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
            <h3>People Following You:</h3>
            <div className="following-page">
                <div className="following-page">
                    {user.followers.length > 0 ? (user.followers.map(id => {
                        const userImage = allUser[id].profilePic ? allUser[id].profilePic : 'https://mangterest-pic.s3.amazonaws.com/11109d2e46ec49e2b8ca2eaa57bb3f86.jpg';
                        return (
                            <div className="main-box">
                                <div>
                                    <img onClick={e => history.push(`/user/${id}`)} className="follower-image" src={userImage} />
                                </div>
                                <div>
                                    <div className="username">
                                        {allUser[id].username}
                                    </div>
                                    <div className="bottomdiv">
                                        <div className="username">
                                            {allUser[id].followers.length} Follower
                                        </div>
                                        <div>
                                            <button onClick={e => dispatch(removeFollowerThunk(user.id, id))}>remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })) : <h1>Post Something To Attract Some Followers!!!!</h1>}
                </div>
            </div>
        </div>
    )
}

export default ShowFollowers
