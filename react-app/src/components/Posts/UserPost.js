import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAllPostThunk } from "../../store/post"
import { getAllUserThunk } from "../../store/session"
import Masonry from "react-masonry-css";
import Loadingpage from "../loadingpage"

const UserPost = (id) => {
    const allPostObj = useSelector(state => state.post.allPost)
    const userId = (+id.id)
    const allPost = Object.values(allPostObj)
    const userPosts = allPost.filter(post => post.userId === userId);

    const history = useHistory('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPostThunk())
        dispatch(getAllUserThunk())
    } , [dispatch])

    const breakpointColumnsObj = {
        default: 4,
        1366: 3,
        1025: 2,
        693: 1
    };

    if(!allPost || !userPosts){
        return <Loadingpage />
    }

    return (
        <div>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="all-post-page"
                columnClassName="work-now"
            >
                {userPosts?.map(post => (
                    <div className="otherstuff" key={post.id}>
                        <div
                            className="individual-post"
                            onClick={e => history.push(`/post/${post.id}`)}
                        >
                            <img
                                className="cards-on-main"
                                src={post?.imageUrl}
                                alt="Post Image"
                            />
                        </div>
                    </div>
                ))}
            </Masonry>
        </div>
    )
}

export default UserPost
