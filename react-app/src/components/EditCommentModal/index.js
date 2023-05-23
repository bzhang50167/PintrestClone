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
    const handleEdit = async (e) => {
        if (text === '') {
            setText(comment.text)
        } else {
            await dispatch(editCommentThunk(commentId, text))

            closeModal()
        }
    }
    return (
        <div className="edit-comment-div">
            <h1>
                EDIT COMMENT
            </h1>
            <form>
                <div>
                    <input
                        type="text"
                        value={text}
                        placeholder={comment.text}
                        onChange={e => setText(e.target.value)}
                    />
                    <button
                        type="submit"
                        onClick={handleEdit}>
                        Edit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditCommentModal
