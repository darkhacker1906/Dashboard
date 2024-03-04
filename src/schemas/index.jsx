import * as Yup from 'yup'
export const signUpSchema=Yup.object({
    name:Yup.string().min(4).max(20).required("Please enter name"),
    email:Yup.string().required("Please enter your email"),
    password:Yup.string().max(15).required("Please enter your password"),
    confirm_password:Yup.string().required("Please enter confirm password").oneOf([Yup.ref('password'),null],"Password must match"),
})
export const signInSchema=Yup.object({
    email:Yup.string().min(6).required("Please enter your email"),
    password:Yup.string().min(6).required("Please enter your password"),
})