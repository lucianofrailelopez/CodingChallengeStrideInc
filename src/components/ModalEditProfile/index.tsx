import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Image from "next/image";

const Modal = ({
    toggleModalOpen,
    photo_url,
    name,
}: {
    photo_url: string;
    name: string;
    toggleModalOpen: () => void;
}) => {
    const {
        register,
        formState: { errors },
    } = useForm();

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
                <Image
                    src={photo_url}
                    alt="profile picture"
                    width={90}
                    height={90}
                    className="rounded-full"
                />
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    {...register("first_name")}
                    error={!!errors.first_name}
                    helperText={
                        errors.first_name ? String(errors.first_name.message) : ""
                    }
                    sx={{
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
                    }}
                />
                <TextField
                    label="Bio"
                    variant="outlined"
                    fullWidth
                    {...register("bio")}
                    error={!!errors.bio}
                    helperText={errors.bio ? String(errors.bio.message) : ""}
                    sx={{
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
                    }}
                />
                <TextField
                    label="Location"
                    variant="outlined"
                    fullWidth
                    {...register("location")}
                    error={!!errors.location}
                    helperText={errors.location ? String(errors.location.message) : ""}
                    sx={{
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
                    }}
                />
                <TextField
                    label="Web"
                    variant="outlined"
                    fullWidth
                    {...register("web")}
                    error={!!errors.web}
                    helperText={errors.web ? String(errors.web.message) : ""}
                    sx={{
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
                    }}
                />
            </div>
        </div>
    );
};

export default Modal;
