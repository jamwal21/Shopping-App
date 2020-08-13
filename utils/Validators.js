import * as Yup from 'yup'

export default () => (
    Yup.object().shape({
        email: Yup.string().email('Not a valid email').required('Email is required'),
        password: Yup.string().required('Password is Required').min(8,'Minimum 8 characters')
    })
)