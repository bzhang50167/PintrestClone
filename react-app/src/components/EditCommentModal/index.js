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
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getCommentByIdThunk(commentId))
    }, [dispatch, commentId])

    useEffect(() => {
        if (text === undefined || !text) {
            setText(comment.text)
        }
    })

    const handleEdit = async (e) => {
        e.preventDefault();

        if (text === '') {
            setErrors(["Can't leave description empty"]);
        } else if (text.length > 100) {
            setErrors(['Please keep comments under 100 characters']);
        } else {
            setErrors([]); // Clear any previous errors
            await dispatch(editCommentThunk(commentId, text));
            closeModal();
        }
    };
    return (
        <div className="edit-comment-div">
            <ul className="error">
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
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
