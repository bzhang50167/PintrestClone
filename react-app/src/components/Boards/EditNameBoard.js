import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { useState } from "react"
import { editBoardNameThunk } from "../../store/boards"


const EditNameofBoard = (board) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const { closeModal } = useModal()
    const [name, setName] = useState(board.board.name)
	const [errors, setErrors] = useState([]);

    console.log(board.board.name);

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(name.length > 40){
            setErrors([
                'Keep name of board under 40 characters!!'
            ])
            return
        } else {
            const info = {
                user_id: user.id,
                name: name
            }
            await dispatch(editBoardNameThunk(info, board.board.id))
            closeModal()
        }

    }
    return (
        <div>
            <ul className="error">
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
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
