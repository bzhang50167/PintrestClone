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
    console.log(id.id,'user~~~~~~~~');
    useEffect(() => {
        dispatch(getAllBoardsThunk())
    }, [dispatch])
    const boardArr = Object.values(allBoard)
    const userBoard = boardArr.filter(board => board.userId === user.id)
    console.log(boardId,'checking');
    const handleAdd = (e) => {
        const info = {
            group_id: boardId,
            post_id: id.id
        }

        dispatch(addImageThunk(info))
        closeModal()
        history.push('/')
    }
    return (
        <div>
            Add to your board
            <div>
                {userBoard.map(board => (
                    <div onClick={e => setBoardId(board.id)}>
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
