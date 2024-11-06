import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { login } from 'features/Login/model/authSlice';
import { useFormik } from 'formik';
import React from 'react';

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}

const regExp = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)

const validate = (values: LoginType) => {
    const errors: Partial<LoginType> = {}
    if (!values.email) {
        errors.email = "Email is required"
    } else if (!regExp.test(values.email)) {
        errors.email = "Invalid email address"
    }
    if (!values.password) {
        errors.password = "Password is required"
    } else if (values.password.length < 4) {
        errors.password = "Password must be at least 4 characters"
    }
    return errors
}

export const useLogin = () => {

    const dispatch = useAppDispatch()
    const isLoggenIn = useAppSelector((state) => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
        email: "",
        password: "",
        rememberMe: false,
        },
        validate,
        onSubmit: (values) => {
            dispatch(login(values))
            formik.resetForm()
        },
    })

    return {formik, isLoggenIn}
};

