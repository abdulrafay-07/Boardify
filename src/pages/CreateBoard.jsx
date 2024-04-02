import React, { useState, useCallback, useEffect } from 'react'
import { Boards } from '../components/index'
import { Button, Input, Menu } from '../components/index.js';
import appwriteService from "../appwrite/config.js";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const CreateBoard = () => {
  const {register, handleSubmit, setValue, watch} = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const generateUniqueID = () => {
    const randomString = Math.random().toString(36);
    const timestamp = new Date().getTime();
    const uniqueId = randomString + timestamp;
    return uniqueId;
  }

  const save = async (data) => {
    if (userData) {
      data.boardID = generateUniqueID();

      const boardDB = await appwriteService.createBoard({...data, userID: userData.$id, username : userData.name})

      if (boardDB) {
        navigate(`/board/${boardDB.$id}`);
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
    const subscription = watch((value, {name}) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, {shouldValidate: true}));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue])

  return !isSubmitted ? (
    <form onSubmit={handleSubmit(save)} className="flex flex-col items-center justify-center h-screen">
      <Input
        label=""
        placeholder="Enter board title"
        className="mb-4"
        {...register("title", { required: true })}
      />
      <Button 
        type="submit" bgColor="bg-blue-500"
      >
        Create a Board
      </Button>
      <div className="hidden">
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
      </div>
    </form>
  ) : null
}

export default CreateBoard;