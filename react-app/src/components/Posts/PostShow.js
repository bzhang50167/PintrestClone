import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { getPostByIdThunk } from "../../store/post";
import './Post.css'
import SubmitBar from "../submitBar";

const OnePost = () => {
    const post = useSelector(state => state.post.onePost)
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const { id } = useParams()
    console.log(id);
    useEffect(() => {
        dispatch(getPostByIdThunk(id))
    }, [dispatch])
    const comments = post.comments
    console.log(post, 'psotstststtsts');
    console.log(comments, 'comments check');
    return (
        <div className="single-post-page">
            <div>
                <img src={post.imageUrl} />
            </div>
            <div>
                <h2>{post.title}</h2>
                <div>
                    {post.text}
                </div>
                <h3>Comments</h3>
                {comments?.length >= 1 ? (
                    comments.map(comment => (
                        <div className="individual-comments">
                            <div>
                                {comment.user.username}
                            </div>
                            <div>
                                {comment.text}
                            </div>
                        </div>

                    ))
                ) : 'No comments yet! Add one to start the conversation.'}

                <div>
                    <SubmitBar sessionUser={sessionUser} />
                </div>

            </div>
        </div>
    )
}

export default OnePost
