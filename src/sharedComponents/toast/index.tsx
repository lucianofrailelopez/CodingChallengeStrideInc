import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { ToastProps } from "@/utils/types";
import { useEffect } from "react";

export const Toast = ({ open, setOpen, message, type }: ToastProps) => {
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setOpen(false);
            }, 2000);
        }
    }, [open, setOpen]);

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={type}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};