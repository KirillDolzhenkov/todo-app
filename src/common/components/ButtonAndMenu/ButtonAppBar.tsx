import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch} from "../../../App/store/store";
import {AuthSliceThunk} from "common/components/Login/AuthSlice";




export default function ButtonAppBar() {
    const dispatch = useAppDispatch();
    const isLoginIn = useSelector<RootStateType,boolean>(state => state.auth.isLoginIn)

    const logIn = ()=>{

    }

    const logOut = ()=>{
       dispatch(AuthSliceThunk.logOutTc())
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    {isLoginIn && <Button onClick={logOut} color="inherit">Log out</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}