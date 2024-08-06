'use client';

import { Button } from '@mui/material';
type FollowButtonProps = {
    userId: string;
    followingId: string;
};

export default function FollowButton({ userId, followingId }: FollowButtonProps) {

    const handleFollow = async () => {
        try {
            const res = await fetch(`/api/user/${userId}/followUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ followingId }),
            });

            if (res.ok) {
                window.location.reload();
            } else {
                console.error('Error following user');
            }
        } catch (error) {
            console.error('Error following user', error);
        }
    };

    return (
        <Button sx={{ borderRadius: 5, fontSize: 10, fontWeight: 700, height: 30, color: '#000', backgroundColor: '#fff' }} onClick={() => handleFollow()}>
            Follow
        </Button>
    );
}