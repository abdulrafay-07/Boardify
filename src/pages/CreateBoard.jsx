import React, { useState, useEffect, useCallback } from 'react';
import { Tldraw, useEditor } from 'tldraw';
import { Button, Input } from '../components/index.js';
import appwriteService from "../appwrite/config.js";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu } from '../components/index.js';
import { useForm } from 'react-hook-form';

const createBoard = ({ board }) => {
    const [submitted, setSubmitted] = useState(false);
    const {register, handleSubmit, setValue} = useForm();
    const editor = useEditor();

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const save = async (data) => {
        const drawingData = JSON.stringify(editor.store.getSnapshot());

        if (board) {
            const file = drawingData ? await appwriteService.uploadFile(drawingData) : null;

            if (file) {
                appwriteService.deleteFile(board.boardID);
            }

            const boardDB = await appwriteService.updateBoard(board.$id, {boardID : file ? file.$id : undefined})

            if (boardDB) {
                navigate(`/board/${boardDB.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(drawingData);

            if (file && userData) {
                const fileId = file.$id;
                data.featuredImageID = fileId;

                const boardDB = await appwriteService.createBoard({...data, userID: userData.$id, username : userData.username})

                if (boardDB) {
                    navigate(`/board/${boardDB.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d]+/g, "-");
        }
        return "";
    }, [])

    useEffect(() => {
        if (board) {
            setValue('title', board.title || '');
            if (board.title) {
                const transformedSlug = slugTransform(board.title);
                setValue('slug', transformedSlug || '');
            }
        }
    }, [board, setValue, slugTransform]);

    return !submitted ? (
        <form onSubmit={handleSubmit(save)}>
            <Input
                label="Title: "
                placeholder="Enter board title: "
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <Button 
                type="submit" bgColor="bg-blue-500" className="w-full" 
                onClick={() => setSubmitted(true)}
            >
                Enter
            </Button>
        </form>
    ) : (
        <div className="fixed inset-0">
            <div className="relative h-full">
                <Menu className="absolute top-0 left-0 z-10" />
                <Tldraw className="relative z-0" />
            </div>
        </div>
    )
}

export default createBoard;