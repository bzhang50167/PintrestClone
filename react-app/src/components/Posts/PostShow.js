import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { getPostByIdThunk } from "../../store/post";
import './Post.css'
import SubmitBar from "../submitBar";
import EditPostModal from "../EditPostModal";
import OpenModalButton from "../OpenModalButton";
import { BsThreeDots } from 'react-icons/bs'
import DeletePostModal from "../DeletePostModal";
import { getAllCommentsThunk } from "../../store/comment";
import EditCommentModal from "../EditCommentModal";
import DeleteCommentModal from "../DeleteCommentModal";
import AddtoBoard from "../Boards/AddtoBoardForm";
import Loadingpage from "../loadingpage";
import { getAllUserThunk } from "../../store/session";

const OnePost = () => {
    const post = useSelector(state => state.post.onePost)
    const sessionUser = useSelector(state => state.session.user)
    const commentObj = useSelector(state => state.comments.allComments)
    const comment = Object.values(commentObj)
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const dispatch = useDispatch()
    const { id } = useParams()
    const ulClassName = "options-dropdown" + (showMenu ? "" : " hidden");
    const commentClassName = 'comment-dropdown' + (showComment ? '' : 'cHidden')
    useEffect(() => {
        dispatch(getPostByIdThunk(id))
        dispatch(getAllCommentsThunk())
        dispatch(getAllUserThunk())
    }, [dispatch, comment.length])

    const comments = post.comments
    if (!post || post.id !== parseInt(id)) {
        return <Loadingpage />
    }
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
                        {sessionUser?.id === post.userId &&
                            <OpenModalButton
                                buttonText='Edit Post'
                                modalComponent={<EditPostModal id={id} />}
                            />
                        }
                        {sessionUser?.id === post.userId &&
                            <OpenModalButton
                                buttonText='Delete Post'
                                modalComponent={<DeletePostModal id={id} />}
                            />
                        }
                        <OpenModalButton
                            buttonText='Add to Board'
                            modalComponent={<AddtoBoard id={post.id} />}
                        />
                    </div>
                    <h2 className="post-title" onClick={e => history.push(`/user/${post.userId}`)}>{post.title}</h2>
                    <div>
                        <textarea
                            className="textarea-comment"
                            cols={34}
                            rows={3}
                            value={post.text}
                        />
                    </div>
                    <h3 className="fit-content">Comments</h3>
                    {comments?.length >= 1 && comments?.length <= 3 ? (
                        comments.reverse().map(comment => (
                            <div className="individual-comments">
                                <div>
                                    <div className="comment-spacing-div">
                                        <div className="user-image-user">
                                            <img src={comment.user.profilePic} className="user-image" />
                                            <Link to={`/user/${comment.userId}`}>
                                                {comment.user.username}
                                            </Link>
                                        </div>
                                        {' '}
                                        <div className="word-break">
                                            <textarea
                                                className="textarea-comment"
                                                cols={34}
                                                rows={3}
                                                value={comment.text}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        {sessionUser?.id === comment.userId ? (
                                            <OpenModalButton
                                                buttonText='Edit'
                                                modalComponent={<EditCommentModal id={comment.id} />}
                                            />
                                        ) : ''}
                                        {sessionUser?.id === comment.userId ? (
                                            <OpenModalButton
                                                buttonText='Delete'
                                                modalComponent={<DeleteCommentModal id={comment.id} />}
                                            />
                                        ) : ''}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : comments?.length > 3 ? (
                        <div>
                            <div
                                className="viewallcomments"
                                onClick={e => setShowComment(!showComment)}>
                                View all {comments.length} Comments
                            </div>
                            <div className={showComment ? commentClassName : "hidden"}>
                                {comments.reverse().map(comment => (
                                    <div className="individual-comments">
                                        <div>
                                            <div className="comment-spacing-div">
                                                <Link to={`/user/${comment.userId}`}>
                                                    {comment.user.username}
                                                </Link>
                                                {' '}
                                                <div className="word-break">
                                                    <textarea
                                                        className="textarea-comment"
                                                        cols={34}
                                                        rows={3}
                                                        value={comment.text}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                {sessionUser?.id === comment.userId ? (
                                                    <OpenModalButton
                                                        buttonText='Edit'
                                                        modalComponent={<EditCommentModal id={comment.id} />}
                                                    />
                                                ) : ''}
                                                {sessionUser?.id === comment.userId ? (
                                                    <OpenModalButton
                                                        buttonText='Delete'
                                                        modalComponent={<DeleteCommentModal id={comment.id} />}
                                                    />
                                                ) : ''}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {!showComment && (
                                    <div>
                                        <Link to={`/user/${comments[comments.length - 1].userId}`}>
                                            {comments[comments.length - 1].user.username}
                                        </Link>
                                        <div>
                                            <textarea
                                                className="textarea-comment"
                                                cols={34}
                                                rows={3}
                                                value={comments[comments.length - 1].text}
                                            />
                                            {sessionUser?.id === comments[comments.length - 1].userId ? (
                                                <OpenModalButton
                                                    buttonText='Edit'
                                                    modalComponent={<EditCommentModal id={comments[comments.length - 1].id} />}
                                                />
                                            ) : ''}
                                            {sessionUser?.id === comments[comments.length - 1].userId ? (
                                                <OpenModalButton
                                                    buttonText='Delete'
                                                    modalComponent={<DeleteCommentModal id={comments[comments.length - 1].id} />}
                                                />
                                            ) : ''}
                                        </div>
                                    </div>
                                )}
                                {!showComment && (
                                    <div>
                                        <Link to={`/user/${comments[comments.length - 2].userId}`}>
                                            {comments[comments.length - 2].user.username}
                                        </Link>
                                        <div>
                                            <textarea
                                                className="textarea-comment"
                                                cols={34}
                                                rows={3}
                                                value={comments[comments.length - 2].text}
                                            />
                                            {sessionUser?.id === comments[comments.length - 2].userId ? (
                                                <OpenModalButton
                                                    buttonText='Edit'
                                                    modalComponent={<EditCommentModal id={comments[comments.length - 2].id} />}
                                                />
                                            ) : ''}
                                            {sessionUser?.id === comments[comments.length - 2].userId ? (
                                                <OpenModalButton
                                                    buttonText='Delete'
                                                    modalComponent={<DeleteCommentModal id={comments[comments.length - 2].id} />}
                                                />
                                            ) : ''}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : 'No comments yet! Add one to start the conversation.'}
                    <div className="comment-bar">
                        {sessionUser &&
                            <SubmitBar sessionUser={sessionUser} />
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OnePost
