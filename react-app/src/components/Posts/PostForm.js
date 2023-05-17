import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AiFillSmile } from "react-icons/ai";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createPostThunk } from "../../store/post";


const PostForm = () => {
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState('')

    const handleAddImage = (e) => {
        setFile(e.target.files[0])

    }

    const handleSubmit = async() => {

        const formData = new FormData()
        formData.append('user_id', user.id)
        formData.append('text', text)
        formData.append('title', title)
        formData.append('image_url',file)

        console.log(formData);
        await dispatch(createPostThunk(formData))
        history.push('/home')
    }

    return (
        <div className="form-page">
            <form className="post-form">
                <div>
                    <label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleAddImage}
                            className="postImage"
                        />
                    </label>
                </div>
                <div className="text-inputs">
                    <div>
                        <input
                            type="text"
                            value={title}
                            placeholder='Title Goes Here'
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={text}
                            placeholder="Tell everyone what your pin is about"
                            onChange={e => setText(e.target.value)}
                        />
                        <button
                        type="submit"
                        onClick={handleSubmit}>
                            <AiFillSmile />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostForm
