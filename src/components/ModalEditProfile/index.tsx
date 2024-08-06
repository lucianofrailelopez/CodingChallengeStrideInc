import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { editProfileSchema } from "@/validations/users";

const Modal = ({
    toggleModalOpen,
    profile_image,
    first_name,
    last_name,
    username,
}: {
    profile_image: string;
    first_name: string;
    last_name: string;
    username: string;
    toggleModalOpen: () => void;
}) => {
    const {
        register,
        setValue,
        formState: { errors },
    } = useForm(
        {
            mode: "onChange",
            resolver: joiResolver(editProfileSchema),
        }
    );

    setValue("first_name", first_name);
    setValue("last_name", last_name);
    setValue("username", username);
    setValue("profile_image", profile_image);

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
            <div className="w-9/12 max-w-3xl p-8 bg-black rounded grid gap-10">
                <div className="flex justify-between">
                    <div>
                        <button className="mr-2 text-[#fff]" onClick={toggleModalOpen}>
                            X
                        </button>
                        <span className="text-xl font-bold">Edit profile</span>
                    </div>
                    <button
                        className="bg-white px-3 py-1 text-black font-bold rounded-full"
                        onClick={toggleModalOpen}
                    >
                        Save
                    </button>
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
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    {...register("profile_image")}
                    error={!!errors.profile_image}
                    helperText={errors.profile_image ? String(errors.profile_image.message) : ""}
                    sx={styled}
                />
            </div>
        </div>
    );
};

export default Modal;
