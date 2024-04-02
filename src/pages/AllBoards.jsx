import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Boards, Button, Menu } from '../components/index';

const AllBoards = () => {
    const [boards, setBoards] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const userData = useSelector((state) => state.auth.userData);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userData) {
                    const boardsData = await appwriteService.getBoards(userData.$id);
                    setBoards(boardsData.documents);
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.log("Error fetching boards:", error);
            }
        };

        fetchData();
    }, [userData, navigate]);

    const handleBoardClick = (boardId, userId, boardSlug) => {
        navigate(`/board/${boardSlug}`);
        setSelectedBoard({ boardId, userId });
    };

    return boards ? (
        <div>
            <div>
                <Menu />
            </div>
            <div className="flex flex-col items-center h-screen">
                <div className="pt-12 lg:pt-0 mb-4 lg:mb-4 lg:h-1/3 flex items-center">
                    {
                        boards.length > 0 ? <h1 className="text-5xl my-2 text-gray-800">Your Boards</h1> : null
                    }
                </div>
                <div className="lg:-mt-24 lg:h-full flex flex-col gap-y-3">
                    {boards && boards.length > 0 ? (
                        selectedBoard ? (
                            <Boards boardId={selectedBoard.boardId} userId={selectedBoard.userId} />
                        ) : (
                            <>
                                {boards.map((board) => (
                                    <Button 
                                        key={board.boardID}
                                        onClick={() => handleBoardClick(board.boardID, board.userID, board.$id)}
                                    >
                                        {board.title}
                                    </Button>
                                ))}
                            </>
                        )
                    ) : (
                        <div className="flex items-center justify-center h-screen">
                            <h1 className="text-5xl my-2 text-gray-800">No boards.</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) :
    <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-5xl my-2 text-gray-800">No boards.</h1>
        <Link to="/" className="text-2xl text-gray-600">Return to homepage</Link>
    </div>
}

export default AllBoards;