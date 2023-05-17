import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllPostThunk } from "../../store/post";
import './splash.css'

const SplashPage = () => {
    const allPost = useSelector(state => state.post.allPost)
    const posts = Object.values(allPost)
    const dispatch = useDispatch()
    console.log(allPost);
    console.log(posts,'posts');

    useEffect(() => {
        dispatch(getAllPostThunk())
    } , [dispatch])

    return(
        <div>
            <div className="splash-box">
                {posts?.map( post => (
                    <div className="splash-div">
                        <img className="splash-image" src={post.imageUrl} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SplashPage
