import { TextField, Button, Avatar } from '@mui/material';
import { User } from "@/utils/types";

const SectionPost = ({ data }: { data: User }) => {


    return (
        <div className="flex flex-col items-end border-t-0 border border-[#bdc5cdd7] pr-4 py-4 box-border min-h-10">
            <div className='flex space-x-4 p-4 w-full'>
                <Avatar alt="User Avatar" src={data.profile_image} />
                <TextField
                    variant="standard"
                    placeholder="What's happening?"
                    InputProps={{ disableUnderline: true }}
                    fullWidth
                    sx={{ '& .MuiInputBase-root': { color: '#fff' } }}
                    multiline
                />
            </div>
            <Button variant="contained" color="primary" sx={{ borderRadius: 10, fontSize: 12, fontWeight: 700, width: '12%' }} >
                Post
            </Button>
        </div>
    )
}

export default SectionPost;