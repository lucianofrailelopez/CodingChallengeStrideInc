'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, ToastStyle } from "@/utils/types";
import { Toast } from "@/components/toast";
import { TextField, Button, Avatar } from '@mui/material';

const SectionPost = ({ data }: { data: User }) => {

    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [type, setType] = useState<ToastStyle>();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (dataForm: any) => {
        try {
            const response = await fetch(`/api/user/${data.id}/createPost`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: dataForm.message,
                    createdAt: new Date().toISOString(),
                })
            });
            const { message } = await response.json();
            setMessage(message);
            setType(response.ok ? "success" : "error");
            setOpen(true);
            if (response.ok) {
                setTimeout(() => {
                    setOpen(false);
                    window.location.reload();
                }, 1000);
            }

        } catch (error) {
            setMessage("Something went wrong");
            setType("error");
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 1000);
        }
    }

    return (
        <>
            <Toast open={open} message={message} type={type} setOpen={setOpen} />
            <form className="flex flex-col items-end border-t-0 border border-[#bdc5cdd7] pr-4 py-4 box-border min-h-10" onSubmit={handleSubmit(onSubmit)}>
                <div className='flex space-x-4 p-4 w-full'>
                    <Avatar alt="User Avatar" src={data.profile_image} />
                    <TextField
                        variant="standard"
                        placeholder="What's happening?"
                        type='text'
                        InputProps={{ disableUnderline: true }}
                        {...register("message")}
                        fullWidth
                        sx={{ '& .MuiInputBase-root': { color: '#fff' } }}
                        multiline
                    />
                </div>
                <Button variant="contained" type="submit" color="primary" sx={{ borderRadius: 10, fontSize: 12, fontWeight: 700, width: '12%' }} >
                    Post
                </Button>
            </form>
        </>

    )
}

export default SectionPost;