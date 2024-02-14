import React from 'react'
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";



export const Home = () => {
  return (
        <div className='home'>
            <Typography variant='h4'>Who are you?</Typography>
            <Stack spacing={2} direction="row">
                <Link to='/topping'>   
                    <Button variant="contained">Owner</Button>
                </Link>
                <Typography variant='h4'>or</Typography>
                <Link to='/pizza'>
                    <Button variant="contained">Chef</Button>
                </Link>
            </Stack>
            <div className='center'>
                <Link to='/menu'>
                    <Button variant="contained">Pizza List</Button>
                </Link>
            </div>
        </div>
  )
}