import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { removePostThunk } from "../../store/boards";

const RemoveFromBoard = ({postId,boardId}) => {
    console.log(postId,'postid');
    console.log(boardId, 'boardId');
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleRemove = () => {
        dispatch(removePostThunk(+postId.postId, +boardId.boardId))
    }
    return (
        <div>
            <h1>
                Remove From Board?
            </h1>
            <div>
                <button onClick={handleRemove}>Yes</button>
            </div>
            <div>
                <button onClick={e => closeModal()}>No</button>
            </div>
        </div>
    )
}

export default RemoveFromBoard
