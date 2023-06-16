import { useEffect, useState } from "react"
import { AiFillSmile } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { editUserThunk } from "../../store/session";


const EditUserModal = (id) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [img, setImg] = useState(null)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])

    const handleImage = (e) => {
        setImg(e.target.files[0])
    }

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName)
            setLastName(user.lastName)
        }
    }, [user])

    const handleSubmit = async (e) => {
        if (firstName === '') {
            setErrors([
                'first name is required'
            ])
        }
        if (lastName === '') {
            setErrors([
                'last name is required'
            ])
        }
        if(errors){
            return errors
        } else {

            const formData = new FormData()
            formData.append('first_name', firstName)
            formData.append('last_name', lastName)
            if (img) {
                formData.append('profile_pic', img)
            }

            await dispatch(editUserThunk(+id.id, formData))
        }
    }
    return (
        <div>
            <h1>EDIT PROFILE</h1>
            <ul className="error">
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <form>
                <div className="editdiv">
                    <label>
                        First Name:
                        <input
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            placeholder={user.firstName}
                        />
                    </label>
                </div>
                <div className="editdiv">
                    <label>
                        Last Name:
                        <input
                            type="text"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            placeholder={user.lastName}
                        />
                    </label>
                </div>
                <div className="editdiv">
                    <label>
                        Profile Pic:
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImage}
                        />
                    </label>
                </div>
                <div className="editdiv">
                    <button
                        type="submit"
                        onClick={handleSubmit}>
                        <AiFillSmile />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditUserModal
