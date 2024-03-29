import React, { useState, useEffect, useCallback } from 'react';
import { Tldraw, useEditor } from 'tldraw';
import { Button, Input, Menu } from '../index.js';
import appwriteService from "../../appwrite/config.js";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const createBoard = ({ board }) => {
    const [submitted, setSubmitted] = useState(false);
    const {register, handleSubmit, setValue, watch, control} = useForm();
    const editor = useEditor();

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const save = async (data) => {
        const stringified = localStorage.getItem('my-editor-snapshot')
        const drawingData = JSON.parse(stringified)

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
                data.boardID = fileId;

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

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title, {shouldValidate: true}));
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue])

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
                onClick={() => {
                    setSubmitted(true)
                }}
            >
                Enter
            </Button>
        </form>
    ) : (
        <form onSubmit={handleSubmit(save)} className="fixed inset-0">
            <div className="relative h-full">
                <div className="absolute top-0 left-0 z-10">
                    <Menu />
                </div>
                <Button 
                    type="submit" bgColor="bg-blue-500" className="absolute top-0 right-0 m-3 lg:m-6 z-10"
                    onClick={() => {
                        const snapshot = editor.store.getSnapshot()
                        const stringified = JSON.stringify(snapshot)
                        localStorage.setItem('my-editor-snapshot', stringified)
                    }}
                >
                    Save Board
                </Button>
                <Tldraw className="relative z-0" />
            </div>
        </form>
    )
}

export default createBoard;