import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Boards } from '../components/index'

const Board = () => {
    const [board, setBoard] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = board && userData ? board.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getBoard(slug).then((board) => {
                if (board) {
                    setBoard(board);
                } else {
                    navigate('/');
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate])

    const deleteBlog = () => {
        appwriteService.deleteBoard(board.$id).then(() => {
            appwriteService.deleteFile(board.boardID);
            navigate('/');
        });
    }

    return (
        isAuthor && (
            <div>
                <Boards board={board} />
            </div>
        )
    )
}

export default Board;