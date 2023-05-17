import { useDispatch, useSelector } from "react-redux"
import OpenModalButton from "../OpenModalButton"
import { useParams } from "react-router-dom/cjs/react-router-dom"
import { useEffect, useState } from "react"
import { editPostThunk, getPostByIdThunk } from "../../store/post"
import { AiFillSmile } from "react-icons/ai";

const EditPostModal = (id) => {
    // console.log(postId);
    const post = useSelector(state => state.post.onePost)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [text, setText] = useState(post.text)
    const [file, setFile] = useState(post.file)
    const [title, setTitle] = useState(post.title)
    const postId = +id.id

    useEffect(() => {
        dispatch(getPostByIdThunk(postId))
    }, [dispatch])

    const handleAddImage = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async() => {

        const formData = {
            text,
            title
        }

        await dispatch(editPostThunk(postId ,formData))
    }

    return (
        <div>
            <form className="post-form">
                <div>
                    <img src={post.imageUrl} />
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

export default EditPostModal
