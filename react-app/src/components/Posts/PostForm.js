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
    const [preview, setPreview] = useState(null)

    const handleAddImage = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile)
        setPreview(URL.createObjectURL(selectedFile))
    }

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('user_id', user.id)
        formData.append('text', text)
        formData.append('title', title)
        formData.append('image_url', file)

        console.log(formData);
        history.push('/home')
        await dispatch(createPostThunk(formData))
    }

    return (
        <div className="form-page">
            {preview && (
                <div className="image-preview">
                    <img src={preview} alt="Preview" />
                </div>
            )}
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
                            className="title-input"
                        />
                    </div>
                    <div className="text-icon">
                        <textarea
                            // type="text"
                            value={text}
                            rows={6}
                            cols={30}
                            placeholder="Tell everyone what your pin is about"
                            onChange={e => setText(e.target.value)}
                        />
                        <div
                            type="submit"
                            onClick={handleSubmit}
                        >
                            <AiFillSmile className="smile-icon" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostForm
