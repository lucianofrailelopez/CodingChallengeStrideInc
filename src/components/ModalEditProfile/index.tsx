import { useState } from "react";
import { User, ToastStyle } from "@/utils/types";
import { Toast } from "@/components/toast";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { editProfileSchema } from "@/validations/users";
import { TextField, Button } from "@mui/material";

const Modal = ({
    toggleModalOpen,
    data
}: {
    data: User;
    toggleModalOpen: () => void;
}) => {
    const {
        register,
        setValue,
        handleSubmit,

        formState: { errors },
    } = useForm<User>(
        {
            mode: "onChange",
            resolver: joiResolver(editProfileSchema),
        }
    );
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [type, setType] = useState<ToastStyle>();

    setValue("first_name", data.first_name);
    setValue("last_name", data.last_name);
    setValue("username", data.username);
    setValue("profile_image", data.profile_image);
    setValue("description", data.description);

    const onSubmit = async (editData: User) => {
        const { first_name, last_name, username, description, profile_image } = editData;
        try {
            const response = await fetch(`/api/user/${data.id}/updateUser`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    username,
                    profile_image,
                    id: data.id,
                    email: data.email,
                    password: data.password,
                    following: data.following,
                    followers: data.followers,
                    description,
                    posts: data.posts,
                }),
            });

            const { message } = await response.json();
            setMessage(message);
            setType(response.ok ? "success" : "error");
            if (response.ok) {
                toggleModalOpen();
                window.location.reload();
            }
        } catch (error) {
            setMessage("An unexpected error occurred.");
            setType("error");
        } finally {
            setOpen(true);
        }
    };

    const styled = {
        position: 'relative',
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "white",
            },
            "&:hover fieldset": {
                borderColor: "white",
            },
        },
        "& .MuiInputLabel-root": {
            color: "white",
        },
        "& .MuiInputBase-input": {
            color: "white",
        },
        "& .MuiFormHelperText-root": {
            position: 'absolute',
            bottom: '-20px',
        }
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <form className="w-9/12 max-w-3xl p-8 bg-black rounded grid gap-10" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row-reverse justify-between">
                    <Button
                        className="bg-white px-3 py-1 text-black font-bold rounded-full"
                        type="submit"
                        variant="contained"
                    >
                        Save
                    </Button>
                    <div>
                        <button className="mr-2 text-[#fff]" onClick={toggleModalOpen}>
                            X
                        </button>
                        <span className="text-xl font-bold">Edit profile</span>
                    </div>
                </div>
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    {...register("first_name")}
                    error={!!errors.first_name}
                    helperText={
                        errors.first_name ? String(errors.first_name.message) : ""
                    }
                    sx={styled}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    {...register("last_name")}
                    error={!!errors.last_name}
                    helperText={errors.last_name ? String(errors.last_name.message) : ""}
                    sx={styled}
                />
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    {...register("username")}
                    error={!!errors.username}
                    helperText={errors.username ? String(errors.username.message) : ""}
                    sx={styled}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    {...register("description")}
                    error={!!errors.description}
                    helperText={errors.description ? String(errors.description.message) : ""}
                    sx={styled}
                />
                <TextField
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    {...register("profile_image")}
                    error={!!errors.profile_image}
                    helperText={errors.profile_image ? String(errors.profile_image.message) : ""}
                    sx={styled}
                />
            </form>
            <Toast message={message} type={type} open={open} setOpen={setOpen} />
        </div>
    );
};

export default Modal;
