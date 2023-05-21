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
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        const info = {
            post_id: id,
            user_id: user.id,
            text: comment
        }

        setComment('')

        await dispatch(createCommentThunk(info))
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
                    />
                    <div type='submit' onClick={handleSubmit}>
                        <spam>
                            <AiFillSmile className='submit-bar-div' />
                        </spam>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmitBar
