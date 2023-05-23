import { useState } from "react"
import { useDispatch } from "react-redux"
import { createBoardNameThunk } from "../../store/boards"
import { useModal } from "../../context/Modal";

const BoardForm = (id) => {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleSubmit = async() => {
        const info = {
            name: name,
            user_id: +id.id
        }
        await dispatch(createBoardNameThunk(info))
        closeModal()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    NAME OF BOARD
                    <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    />
                </label>
                <button type="submit">
                    Create Board
                </button>
            </form>
        </div>
    )
}


export default BoardForm
