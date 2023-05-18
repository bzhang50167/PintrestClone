import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAllPostThunk } from "../../store/post"

const UserPost = () => {
    const allPostObj = useSelector(state => state.post.allPost)
    const userId = useSelector(state => state.session.user.id)
    const allPost = Object.values(allPostObj)
    // console.log(id);
    console.log(userId);
    console.log(allPost.map(post => post.userId));

    const userPosts = allPost.filter(post => post.userId === userId);

    const history = useHistory('')
    const dispatch = useDispatch()
    console.log(allPost,'userPost');

    useEffect(() => {
        dispatch(getAllPostThunk())
    } , [dispatch])
    return (
        <div>
            <div className="all-post-page">
                {userPosts?.map( post => (
                    <div className="individual-post"
                    onClick={e => history.push(`/post/${post.id}`)}>
                        <img className="cards-on-main"
                        src={post.imageUrl}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserPost
