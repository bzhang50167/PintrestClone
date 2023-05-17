import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editCommentThunk, getCommentByIdThunk } from "../../store/comment"
import { useModal } from "../../context/Modal";

const EditCommentModal = (id) => {
    const comment = useSelector(state => state.comments.oneComment)
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const commentId = +id.id
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getCommentByIdThunk(commentId))
    }, [dispatch])
    // console.log(comment, 'comment');
    // console.log(commentId);
    const handleEdit = async (e) => {
        const data = {
            text
        }
        await dispatch(editCommentThunk(commentId, data))
        closeModal()
    }
    return (
        <div>
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
