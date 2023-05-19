import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOneBoardThunk, removePostThunk } from "../../store/boards"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom"
import OpenModalButton from "../OpenModalButton"
import RemoveFromBoard from "./RemoveFromBoard"

const BoardShow = () => {
    const board = useSelector(state => state.boards.oneBoard)
    const render = useSelector(state => state.boards.oneBoard.groupPost)
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const handleRemove = (postId) => {
        dispatch(removePostThunk(postId,board.id))
    }

    useEffect(() => {
        dispatch(getOneBoardThunk(id))
    }, [dispatch,render?.length])

    if (!board.groupPost) {
        return null
    }


    return (
        <div>
            <div>
                <h1>
                    {board.name}
                </h1>
            </div>
            <div>
                {board.groupPost.map(post => (
                    <div>
                        <div onClick={e => history.push(`/post/${post.id}`)}>
                            <img className="cards-on-main" src={post.imageUrl} />
                        </div>
                        <div>
                            <button onClick={e => handleRemove(post.id)}>
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
