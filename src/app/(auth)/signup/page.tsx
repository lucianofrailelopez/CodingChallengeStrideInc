"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { signupSchema } from "@/validations/users";
import { signupData, ToastStyle } from "@/utils/types";
import { Toast } from "@/components/toast";
import {
    Button,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<signupData>({
        mode: "onChange",
        resolver: joiResolver(signupSchema),
    });
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [type, setType] = useState<ToastStyle>();
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleClickShowRepeatPassword = () => {
        setShowRepeatPassword((prev) => !prev);
    };

    const onSubmit = async (data: signupData) => {
        const { first_name, last_name, username, email, password } = data;
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    username,
                    email,
                    password,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(result.message);
                setType("success");
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
            } else {
                setMessage(result.message);
                setType("error");
            }
        } catch (error) {
            setMessage("An unexpected error occurred.");
            setType("error");
        } finally {
            setOpen(true);
        }
    };

    return (
        <div className="flex min-h-screen flex-col justify-center">
            <div className="w-full flex justify-center">
                <form
                    className="p-10 max-w-3xl w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mb-4 flex flex-col gap-6">
                        <TwitterIcon sx={{ color: "#1DA1F2", fontSize: "50px" }} />
                        <Typography
                            variant="h4"
                            component="h4"
                            sx={{ color: "white", fontWeight: "900" }}
                        >
                            Create your account
                        </Typography>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <TextField
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    {...register("first_name")}
                                    error={!!errors.first_name}
                                    helperText={
                                        errors.first_name ? String(errors.first_name.message) : ""
                                    }
                                    sx={{
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
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    {...register("last_name")}
                                    error={!!errors.last_name}
                                    helperText={
                                        errors.last_name ? String(errors.last_name.message) : ""
                                    }
                                    sx={{
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
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    {...register("username")}
                                    error={!!errors.username}
                                    helperText={
                                        errors.username ? String(errors.username.message) : ""
                                    }
                                    sx={{
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
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    fullWidth
                                    {...register("email")}
                                    error={!!errors.email}
                                    helperText={errors.email ? String(errors.email.message) : ""}
                                    sx={{
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
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    {...register("password")}
                                    error={!!errors.password}
                                    helperText={
                                        errors.password ? String(errors.password.message) : ""
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                    sx={{ color: "white" }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
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
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Repeat Password"
                                    variant="outlined"
                                    type={showRepeatPassword ? "text" : "password"}
                                    fullWidth
                                    {...register("repeat_password")}
                                    error={!!errors.repeat_password}
                                    helperText={
                                        errors.repeat_password
                                            ? String(errors.repeat_password.message)
                                            : ""
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowRepeatPassword}
                                                    edge="end"
                                                    sx={{ color: "white" }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
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
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mt-10 flex flex-col items-center gap-4">
                            <Button
                                variant="contained"
                                color="primary"
                                className="py-3"
                                fullWidth
                                type="submit"
                                sx={{
                                    backgroundColor: "#1DA1F2",
                                    maxWidth: "400px",
                                    borderRadius: "76px",
                                    "&:hover": {
                                        backgroundColor: "#1DA1F2",
                                    },
                                }}
                            >
                                Signup
                            </Button>
                            <Link href="/login">
                                <Typography sx={{ color: "#1DA1F2" }}>
                                    Already have an account? Login
                                </Typography>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            <Toast message={message} type={type} open={open} setOpen={setOpen} />
        </div>
    );
};

export default Register;
