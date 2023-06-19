import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { editPostThunk, getPostByIdThunk } from "../../store/post"
import { AiFillSmile } from "react-icons/ai";
import './editmodal.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useModal } from "../../context/Modal";

const EditPostModal = (id) => {
    const post = useSelector(state => state.post.onePost)
    const { closeModal } = useModal();
    const dispatch = useDispatch()
    const history = useHistory()
    const [text, setText] = useState(post.text)
	const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(post.title)
    const postId = +id.id

    useEffect(() => {
        dispatch(getPostByIdThunk(postId))
    }, [dispatch, postId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(text === ''){
            setErrors([
                "Can't leave discription empty"
            ])
        }
        else if(title.length > 40){
            setErrors([
                "Keep title under 40 characters"
            ])
        }
        else if (title === ''){
            setErrors([
                "Can't leave title empty"
            ])
        } else if (text.length > 100){
            setErrors([
                'Please keep comments under 100 characters'
            ])
        } else {
            const formData = {
                text,
                title
            }

            await dispatch(editPostThunk(postId, formData))
            history.push(`/post/${+id.id}`)
            closeModal()
        }
    }

    return (
        <div>
            <form className="post-form">
                <div>
                    <img className="post-image-edit" alt="postimage" src={post.imageUrl} />
                </div>
                <div className="text-inputs">
                    <div>
                        <label>

                            <input
                                type="text"
                                value={title}
                                placeholder='Title Goes Here'
                                onChange={e => setTitle(e.target.value)}
                                className="title-input"
                            />
                        </label>
                    </div>
                    <div className="text-icon">
                        <textarea
                            // type="text"
                            className="textarea-edit"
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

export default EditPostModal
