import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import { Boards } from '../components/index'

const Board = () => {
    const [board, setBoard] = useState(null);
    const [boardId, setBoardId] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getBoard(slug).then((board) => {
                if (board) {
                    setBoard(board);
                    setBoardId(board.boardID);
                } else {
                    navigate('/');
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate])

    const deleteBoard = () => {
        appwriteService.deleteBoard(board.$id).then(() => {
            navigate('/');
        });
    }

    return (
        <div>
            <Boards boardId={boardId} deleteBoard={deleteBoard} />
        </div>
    )
}

export default Board;