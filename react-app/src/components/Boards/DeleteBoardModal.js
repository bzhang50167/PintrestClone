import { useDispatch } from "react-redux";
import { deleteBoardThunk } from "../../store/boards";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useModal } from "../../context/Modal";

const DeleteBoardModal = (id) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteBoardThunk(+id.id))
        history.push('/')
        closeModal()
    }
    return(
        <div>
            Are You Sure You Want To Delete This Board
            <div>
            <button
            onClick={handleDelete}
            >Yes
            </button>
            <button>No</button>
            </div>
        </div>
    )
}

export default DeleteBoardModal
