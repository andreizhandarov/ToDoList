import React from 'react';
import Container from "@mui/material/Container"
import { Outlet } from "react-router-dom"

export const Providers = () => {
    return (
        <>
            <Container fixed>
                <Outlet/>
            </Container>
        </>
    );
};

