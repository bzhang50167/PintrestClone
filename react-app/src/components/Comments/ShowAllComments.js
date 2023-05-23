import { useSelector } from "react-redux"

const ShowAllComments = () => {
    const sessionUser = useSelector(state => state.session.user)
    const commentObj = useSelector(state => state.comments.allComments)
    const comment = Object.values(commentObj)
    const comments = post.comments
    return (
        <div>

            <h3>Comments</h3>
            {comments?.length >= 1 ? (
                comments.map(comment => (
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

                ))
            ) : 'No comments yet! Add one to start the conversation.'
            }
        </div>
    )
}

export default ShowAllComments
