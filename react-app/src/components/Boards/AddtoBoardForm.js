import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addImageThunk, getAllBoardsThunk } from "../../store/boards"
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const AddtoBoard = (id) => {
    const allBoard = useSelector(state => state.boards.allBoards)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const history = useHistory()
    const [boardId, setBoardId] = useState('')
    useEffect(() => {
        dispatch(getAllBoardsThunk())
    }, [dispatch])
    const boardArr = Object.values(allBoard)
    const userBoard = boardArr.filter(board => board.userId === user.id)
    const handleAdd = (e) => {
        const info = {
            group_id: boardId,
            post_id: id.id
        }

        dispatch(addImageThunk(info))
        closeModal()
        history.push(`/user/${user.id}`)
    }

    const handleClick = (board) => {
        setBoardId(board.id);
    };

    return (
        <div >
            <h1>
                Add to your board
            </h1>
            <div>
                {userBoard.map(board => (
                    <div
                        className={`board-names ${board.id === boardId ? "active" : ""}`}
                        onClick={() => handleClick(board)}
                        key={board.id}
                    >
                        {board.name}
                    </div>
                ))}
            </div>
            <button onClick={handleAdd}>
                Add
            </button>
        </div>
    )
}

export default AddtoBoard
