
import { useDispatch } from "react-redux"
import { deletePostThunk } from "../../store/post"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal";

const DeletePostModal = (id) => {
    const postId = +id.id
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal();


    const handleDelete = (e) => {
        dispatch(deletePostThunk(postId))
        closeModal()
        history.push('/home')
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

export default DeletePostModal
