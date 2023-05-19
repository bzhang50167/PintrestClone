import { useState } from "react"
import { AiFillSmile } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { editUserThunk } from "../../store/session";


const EditUserModal = (id) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [img, setImg] = useState(null)
    const dispatch = useDispatch()

    const handleImage = (e) => {
        setImg(e.target.files[0])
    }

    const handleSubmit = async(e) => {
        const formData = new FormData()
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('profile_pic', img)

        await dispatch(editUserThunk(+id.id, formData))
    }

    return (
        <div>
            <form>
                <label>
                    First Name
                    <input
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="First Name"
                    />
                </label>
                <label>
                    Last Name
                    <input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Last Name"
                    />
                </label>
                <label>
                    Profile Pic
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImage}
                    />
                </label>
                <button
                    type="submit"
                    onClick={handleSubmit}>
                    <AiFillSmile />
                </button>
            </form>
        </div>
    )
}

export default EditUserModal
