import React from "react"
import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useFormik } from "formik"
import { loginTC } from "./authSlice"
import { useAppDispatch, useAppSelector } from "../../app/state/store"
import { Navigate } from "react-router-dom"

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
}

const regExp = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)

const validate = (values: any) => {
  const errors: FormikErrorType = {}
  if (!values.email) {
    errors.email = "Email is required"
  } else if (!regExp.test(values.email)) {
    errors.email = "Invalid email address"
  }
  if (!values.password) {
    errors.password = "Password is required"
  } else if (values.password.length < 4) {
    errors.password = "Password must be at least 6 characters"
  }
  return errors
}

export const Login = () => {
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
      //  alert(JSON.stringify(values))
      dispatch(loginTC(values))
      formik.resetForm()
    },
  })

  if (isLoggenIn) {
    return <Navigate to={"/todolists"} />
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <p>
              To log in get registered
              <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                error={!!formik.errors.email && formik.touched.email}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                error={!!formik.errors.password && formik.touched.password}
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
