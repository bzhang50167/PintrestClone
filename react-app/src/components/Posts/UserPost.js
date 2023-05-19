import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAllPostThunk } from "../../store/post"
import { getAllUserThunk } from "../../store/session"
import Masonry from "react-masonry-css";

const UserPost = (id) => {
    const allPostObj = useSelector(state => state.post.allPost)
    const userId = (+id.id)
    const allPost = Object.values(allPostObj)
    const allUser = useSelector(state => state.session)
    console.log(userId);
    console.log(allPost.map(post => post.userId));

    const userPosts = allPost.filter(post => post.userId === userId);

    const history = useHistory('')
    const dispatch = useDispatch()
    console.log(allPost,'userPost');

    useEffect(() => {
        dispatch(getAllPostThunk())
        dispatch(getAllUserThunk())
    } , [dispatch])

    const breakpointColumnsObj = {
        default: 4, // number of columns by default
        1200: 3, // number of columns for screens >= 1200px
        992: 2, // number of columns for screens >= 992px
        768: 1 // number of columns for screens >= 768px
    };

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
