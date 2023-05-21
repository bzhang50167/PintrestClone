
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
        // dispatch(getAllPostThunk())
        history.push('/home')
    }

    const close = () => {
        closeModal()
    }
    return (
        <div className="deletemodal">
            <h1>
                Are you sure you want to delete this post?
            </h1>
            <div className="seperate">
                <button
                    className="delete-button"
                    onClick={handleDelete}>
                    Delete
                </button>
                <button
                    className="close-button"
                    onClick={close}>
                    No
                </button>
            </div>
        </div>
    )
}

export default DeletePostModal
