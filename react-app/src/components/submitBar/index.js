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
                "Comment can't be empty!!"
            ])
        } else if(comment.length > 100) {
            setErrors([
                'Keep comments under 100 characters!!'
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
            {user.profilePic !== null ? (
                    <img className="user-image" src={user.profilePic} />
                ) : <img className="user-image" src="https://mangterest-pic.s3.amazonaws.com/11109d2e46ec49e2b8ca2eaa57bb3f86.jpg" />
                }
                <div className='inside-bar'>
                     <textarea
                        value={comment}
                        cols={33}
                        rows={2}
                        className="edit-textarea"
                        placeholder='Add a comment'
                        onChange={e => setComment(e.target.value)}
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
