import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { getPostByIdThunk } from "../../store/post";
import './Post.css'
import SubmitBar from "../submitBar";
import EditPostModal from "../EditPostModal";
import OpenModalButton from "../OpenModalButton";
import { BsThreeDots } from 'react-icons/bs'
import DeletePostModal from "../DeletePostModal";


const OnePost = () => {
    const post = useSelector(state => state.post.onePost)
    const sessionUser = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    const { id } = useParams()
    const ulClassName = "options-dropdown" + (showMenu ? "" : " hidden");
    console.log(id);
    useEffect(() => {
        dispatch(getPostByIdThunk(id))
    }, [dispatch])
    const comments = post.comments
    console.log(post, 'psotstststtsts');
    console.log(comments, 'comments check');
    return (
        <div className="whole-page-single">
            <div className="single-post-page">
                <div>
                    <img className="image-border" src={post.imageUrl} />
                </div>
                <div className="single-post-info">
                    <button onClick={e => setShowMenu(!showMenu)}>
                        {<BsThreeDots />}
                    </button>
                    <div
                    className={ulClassName}
                    onClick={e => setShowMenu(!showMenu)}>
                        <OpenModalButton
                        buttonText='Edit Post'
                        modalComponent={<EditPostModal id={id} />}
                        />
                        <OpenModalButton
                        buttonText='Delete Post'
                        modalComponent={<DeletePostModal id={id} />}
                        />
                    </div>
                    <h2>{post.title}</h2>
                    <div>
                        {post.text}
                    </div>
                    <h3>Comments</h3>
                    {comments?.length >= 1 ? (
                        comments.map(comment => (
                            <div className="individual-comments" key={comment.id}>
                                <div>
                                    {comment.user.username}
                                </div>
                                <div>
                                    {comment.text}
                                </div>
                            </div>

                        ))
                    ) : 'No comments yet! Add one to start the conversation.'}

                    <div className="comment-bar">
                        <SubmitBar sessionUser={sessionUser} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OnePost
