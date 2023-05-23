import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOneBoardThunk, removePostThunk } from "../../store/boards"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom"
import OpenModalButton from "../OpenModalButton"
import RemoveFromBoard from "./RemoveFromBoard"
import DeleteBoardModal from "./DeleteBoardModal"
import EditNameofBoard from "./EditNameBoard"

const BoardShow = () => {
    const board = useSelector(state => state.boards.oneBoard)
    // const render = useSelector(state => state.boards.oneBoard.groupPost)
    // const renedrL = Object.values(render)
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const [postLength, setPostLength] = useState(0)

    const handleRemove = (postId) => {
        dispatch(removePostThunk(postId, board.id))
        // dispatch(getOneBoardThunk())
    }

    console.log(board.groupPost?.length);

    useEffect(() => {
        dispatch(getOneBoardThunk(id))
        setPostLength(board.groupPost?.length)
    }, [dispatch, board.groupPost?.length])

    if (!board.groupPost) {
        return null
    }

    if (board.groupPost.length !== postLength) {
        dispatch(getOneBoardThunk(id))
    }



    return (
        <div>
            <div>
                <h1>
                    <div>
                        {board.name}
                    </div>
                    <div>
                        <div>
                            <OpenModalButton
                                buttonText='Edit Name of Board'
                                modalComponent={<EditNameofBoard board={board} />}
                            />
                        </div>
                        <div>
                            <OpenModalButton
                                buttonText='Delete Board'
                                modalComponent={<DeleteBoardModal id={id} />}
                            />
                        </div>
                    </div>
                </h1>
            </div>
            <div className="whole-board-show">
                {board.groupPost.map(post => (
                    <div className="board-show">
                        <div onClick={e => history.push(`/post/${post.id}`)}>
                            <img className="cards-on-main" src={post.imageUrl} />
                        </div>
                        <div>
                            <button
                                className="remove-board-button"
                                onClick={e => handleRemove(post.id)}>
                                remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BoardShow
