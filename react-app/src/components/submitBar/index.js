import { useState } from 'react';
import './bar.css'
import { AiFillSmile } from "react-icons/ai";
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch } from 'react-redux';
import { createPostThunk } from '../../store/post';
import { createCommentThunk } from '../../store/comment';

const SubmitBar = (sessionUser) => {
    const user = sessionUser.sessionUser
    const { id } = useParams()
	const [errors, setErrors] = useState([]);
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        if(comment === ''){
            setErrors([
                "comment can't be empty"
            ])
        } else {
            const info = {
                post_id: id,
                user_id: user.id,
                text: comment
            }

            setComment('')
            setErrors([])

            await dispatch(createCommentThunk(info))
        }

    }
    return (
        <div>
            <div className='bar'>
                <img className="user-image" src={user?.profilePic} />
                <div className='inside-bar'>
                    <input
                        type='text'
                        value={comment}
                        placeholder='Add a comment'
                        onChange={e => setComment(e.target.value)}
                        required
                    />
                    <div type='submit' onClick={handleSubmit}>
                        <spam>
                            <AiFillSmile className='submit-bar-div' />
                        </spam>
                    </div>
                </div>
            </div>
            <ul className="error">
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
        </div>
    )
}

export default SubmitBar
