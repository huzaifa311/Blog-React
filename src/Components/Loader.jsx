import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const CircularColor = () => {
    return (
        <Stack sx={{ color: 'grey.500', position: 'absolute', top: '50%', left: '50%',transform: 'translate(-50%, -50%)' }} spacing={2} direction="row">
            <CircularProgress color="secondary" sx={{
                height: '400px',
                width: '400px',
                justifyContent: 'center',
                display : 'flex',
                alignItems : 'center'
            }} />
        </Stack>
    );
}
export default CircularColor;