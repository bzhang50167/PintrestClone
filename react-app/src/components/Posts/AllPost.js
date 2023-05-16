import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllPostThunk } from "../../store/post";
import './Post.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AllPost = () => {
    const allPost = useSelector(state => state.post.allPost)
    const posts = Object.values(allPost)
    const history = useHistory()
    const dispatch = useDispatch()
    console.log(allPost);
    console.log(posts,'posts');

    useEffect(() => {
        dispatch(getAllPostThunk())
    } , [dispatch])

    return(
        <div>
            <div className="all-post-page">
                {posts?.map( post => (
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

export default AllPost
