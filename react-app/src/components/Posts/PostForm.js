import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AiFillSmile } from "react-icons/ai";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createPostThunk } from "../../store/post";
import './Post.css'

const PostForm = () => {
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState('')
    const [preview, setPreview] = useState(null)
    const [errors, setErrors] = useState([]);

    const handleAddImage = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile)
        setPreview(URL.createObjectURL(selectedFile))
    }

    const handleSubmit = async () => {
        if (!file) {
            setErrors([
                'Image Required'
            ])
        } else if (!title) {
            setErrors([
                'Title Required'
            ])
        } else if (!text) {
            setErrors([
                'Tell everyone about the post'
            ])
        } else if (text.length > 250){
            setErrors([
                'Text should not exceed 250 characters'
            ])
        } else if (title.length > 40) {
            setErrors([
                'Title should not exceed 40 characters'
            ])
        } else {
            const formData = new FormData()
            formData.append('user_id', user.id)
            formData.append('text', text)
            formData.append('title', title)
            formData.append('image_url', file)

            history.push('/home')
            await dispatch(createPostThunk(formData))
        }



    }

    return (
        <div className="form-page">
            {preview && (
                <div className="image-preview">
                    <img src={preview} alt="Preview" className="image-preview" />
                </div>
            )}
            <form className="post-form">
                <div>
                    <h1 className="new-post-title">Create New Post</h1>
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
                            className="title-input"
                            required
                        />
                    </div>
                    <div className="text-icon">
                        <textarea
                            value={text}
                            rows={6}
                            cols={30}
                            placeholder="Tell everyone what your pin is about"
                            onChange={e => setText(e.target.value)}
                            required
                        />
                        <div
                            type="submit"
                            onClick={handleSubmit}
                        >
                            <AiFillSmile className="smile-icon" />
                        </div>
                    </div>
                    <ul className="error">
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default PostForm
