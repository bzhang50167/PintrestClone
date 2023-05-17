import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { deleteCommentThunk } from "../../store/comment";

const DeleteCommentModal = (id) => {
    const commentId = +id.id
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        await dispatch(deleteCommentThunk(commentId))
        closeModal()
    }
    return (
        <div>
            <h1>
                Are you sure you want to delete this post
            </h1>
            <button
                onClick={handleDelete}>
                Delete
            </button>
        </div>
    )
}

export default DeleteCommentModal
