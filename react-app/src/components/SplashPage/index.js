import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllPostThunk } from "../../store/post";
import './splash.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const SplashPage = () => {
    const allPost = useSelector(state => state.post.allPost)
    const user = useSelector(state => state.session)
    const posts = Object.values(allPost)
    const history = useHistory()
    const dispatch = useDispatch()
    console.log(user);

    useEffect(() => {
        dispatch(getAllPostThunk())
    }, [dispatch])

    return (
        <div>
            {user.user !== null ? history.push('/home') :
                (
                    <div className="splash-box">
                        {posts?.map(post => (
                            <div className="splash-div">
                                <img className="splash-image" src={post.imageUrl} />
                            </div>
                        ))}
                    </div>
                )}
        </div>
    )
}

export default SplashPage
