import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllPostThunk } from "../../store/post";

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
            <div>
                {posts?.map( post => (
                    <div>
                        <img src={post.imageUrl} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SplashPage
