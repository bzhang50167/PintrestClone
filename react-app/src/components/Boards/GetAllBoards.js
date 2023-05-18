import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoardsThunk } from "../../store/boards";
import './index.css'

const GetAllBoard = () => {
    const allBoards = useSelector((state) => state.boards.allBoards);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBoardsThunk());
    }, [dispatch]);

    console.log(allBoards, 'all boards');

    const boards = Object.values(allBoards);

    return (
        <div className="whole-page">
            {boards.map((board) => (
                <div className="other-page">
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
