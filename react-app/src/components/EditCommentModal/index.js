import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editCommentThunk, getCommentByIdThunk } from "../../store/comment"
import { useModal } from "../../context/Modal";
import './editcomment.css'

const EditCommentModal = (id) => {
    const comment = useSelector(state => state.comments.oneComment)
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const commentId = +id.id
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getCommentByIdThunk(commentId))
    }, [dispatch, commentId])

    useEffect(() => {
        if (text === undefined || !text) {
            setText(comment.text)
        }
    })

    const handleEdit = async (e) => {
        await dispatch(editCommentThunk(commentId, text))
        closeModal()
    }
    return (
        <div className="edit-comment-div">
            <h1>
                EDIT COMMENT
            </h1>
            <form>
                <div>
                    <textarea
                        value={text}
                        cols={33}
                        rows={3}
                        className="edit-textarea"
                        placeholder={comment.text}
                        onChange={e => setText(e.target.value)}
                    />
                    <div>

                        <button
                            type="submit"
                            onClick={handleEdit}>
                            Edit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditCommentModal
