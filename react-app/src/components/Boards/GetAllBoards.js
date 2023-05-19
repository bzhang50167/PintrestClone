import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoardsThunk } from "../../store/boards";
import './index.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const GetAllBoard = (id) => {
    const allBoards = useSelector((state) => state.boards.allBoards);
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllBoardsThunk());
    }, [dispatch]);

    const boards = Object.values(allBoards);
    const userBoard = boards.filter(board => board.userId === (+id.id))

    return (
        <div className="whole-page">
            {userBoard.map((board) => (
                <div className="other-page" onClick={e => history.push(`/board/${board.id}`) }>
                    <div className="mainimg">
                        {board.groupPost[0] !== null ? (
                            <div>
                                <img
                                className="mainpic"
                                src={board.groupPost[0]?.imageUrl}
                                title={board.name}/>
                            </div>
                        ) : ''}
                    </div>
                    <div className="otherimg">
                        <div>
                            {board.groupPost[1] !== null ? (
                                <div>
                                    <img
                                    className="otherpic"
                                    src={board.groupPost[1]?.imageUrl}
                                    title={board.name}/>
                                </div>
                            ) : ''}
                        </div>
                        <div>
                            {board.groupPost[2] !== null ? (
                                <div>
                                    <img
                                    className="otherpic"
                                    src={board.groupPost[2]?.imageUrl}
                                    title={board.name} />
                                </div>
                            ) : ''}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GetAllBoard;
