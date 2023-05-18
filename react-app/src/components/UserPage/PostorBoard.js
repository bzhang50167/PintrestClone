import { useState } from "react"
import GetAllBoard from "../Boards/GetAllBoards"
import UserPost from "../Posts/UserPost"

const PostorBoard = () => {
    const [classname, setClassname] = useState('')

    return (
        <div>
            <div className="post-board">
                <div className="changingbutton">
                    <button className="button-button" onClick={e => setClassname('showPosts')}>Posts</button>
                    <button className="button-button" onClick={e => setClassname('showBoard')}>Boards</button>
                </div>
            </div>
            {classname === 'showBoard' ? (
                <GetAllBoard />
            ) : ''}
            {classname === 'showPosts' ? (
                <UserPost />
            ) : ''}
        </div>
    )
}

export default PostorBoard
