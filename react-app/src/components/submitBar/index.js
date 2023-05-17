import { useState } from 'react';
import './bar.css'
import { AiFillSmile } from "react-icons/ai";
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch } from 'react-redux';

const SubmitBar = (sessionUser) => {
    const user = sessionUser.sessionUser
    const { id } = useParams()
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        const info = {
            post_id: id,
            user_id: user.id,
            text: comment
        }

        dispatch()
    }
    return (
        <div>
            <div className='bar'>
                <img className="user-image" src={user.profilePic} />
                <div className='inside-bar'>
                    <input
                        type='text'
                        value={comment}
                        placeholder='Add a comment'
                        onChange={e => setComment(e.target.value)}
                    />
                    <button type='submit' onClick={handleSubmit}>
                        <AiFillSmile />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SubmitBar
