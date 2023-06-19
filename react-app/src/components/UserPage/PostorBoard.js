import { useState } from "react"
import GetAllBoard from "../Boards/GetAllBoards"
import UserPost from "../Posts/UserPost"
import { useParams } from "react-router-dom/cjs/react-router-dom"

const PostorBoard = () => {
    const [classname, setClassname] = useState('')
    const { id } = useParams()


    return (
        <div>
            <div className="post-board">
                <div className="changingbutton">
                    <button className="button-button" onClick={e => setClassname('showPosts')}>Posts</button>
                    <button className="button-button" onClick={e => setClassname('showBoard')}>Boards</button>
                </div>
            </div>
            {classname === 'showBoard' ? (
                <GetAllBoard id={id}/>
            ) : ''}
            {classname === 'showPosts' ? (
                <UserPost id={id} />
            ) : ''}
        </div>
    )
}

export default PostorBoard
