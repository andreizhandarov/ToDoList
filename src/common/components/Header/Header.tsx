import React from 'react';
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Switch from "@mui/material/Switch"
import { MenuButton } from '../MenuButton/MenuButton';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { RequestStatusType } from 'app/appSlice';
import { LinearProgress } from "@mui/material"
import { logout } from 'features/Login/model/authSlice';
import { themeMode } from 'features/Theme/model/themeSlice';
import { useCreateTheme } from 'features/Theme/lib/hooks/useCreateTheme';

export const Header = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)
    const { ThemeMode } = useCreateTheme()

    const logOut = () => {
        dispatch(logout())
    }
    
    const changeThemeHandler = () => {
        dispatch(themeMode(ThemeMode === "light" ? "dark" : "light"))
    }
    
    return (
        <>
            <AppBar position="static" sx={{ mb: "15px" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <div>
                        {isLoggedIn && <MenuButton onClick={logOut}>Logout</MenuButton>}
                        {!isLoggedIn && <MenuButton sx={{ background: "#ab47bc" }}>FAQ</MenuButton>}
                        <Switch color={"default"} onChange={changeThemeHandler} />
                    </div>
                </Toolbar>
                    {status === "loading" && <LinearProgress />}
            </AppBar>
        </>
    );
};

