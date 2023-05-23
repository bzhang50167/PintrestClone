import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { useState } from "react"
import { editBoardNameThunk } from "../../store/boards"


const EditNameofBoard = (board) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const { closeModal } = useModal()
    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        // e.preventDefault()
        const info = {
            user_id: user.id,
            name: name
        }
        // console.log(info);
        dispatch(editBoardNameThunk(info, board.board.id))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    name:
                    <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={board.board.name}
                    />
                </label>
                <button>Change</button>
            </form>
        </div>
    )
}

export default EditNameofBoard
