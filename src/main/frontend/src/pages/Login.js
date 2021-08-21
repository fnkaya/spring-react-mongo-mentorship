import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginRequest} from "../action/authActions";
import {useEffect} from "react";
import {Button, Card, Divider, Form, Icon} from "semantic-ui-react";
import {GOOGLE_AUTH_URL} from "../auth/oauth/OAuth2Constants";

const Login = (props) => {
    const { pending, authenticated, principals, error } = useSelector((state) => state.authState.toJS())
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate: values => {
            const { username, password } = values
            let errors = {}

            if (!username || username === '') {
                errors.username = 'Kullanıcı adı boş olamaz'
            }

            if (!password || password === '') {
                errors.password = 'Şifre boş olamaz'
            }

            return errors
        },
        onSubmit: values => {
            const { username, password } = values
            dispatch(loginRequest({
                username,
                password
            }))
        }
    })

    useEffect(() => {
        if (authenticated) {
            principals.role === 'ROLE_ADMIN' ? props.history.push('/admin') : props.history.push('/')
        }
    }, [authenticated, principals, props.history])

    return (
        <div className='row h-100'>
            <div className='col-12 col-sm-3 col-md-6 d-flex justify-content-center align-content-center'>
                <img src='./sign_in.svg' alt='sign_in' style={{width: '40vh'}}/>
            </div>
            <div className='col-12 col-sm-9 col-md-6 d-flex'>
                <Card className='align-self-center d-flex justify-content-center p-5' style={{height: '60vh', width: '50vh'}}>
                    <a className='btn btn-block btn-danger w-100' href={GOOGLE_AUTH_URL}><Icon name='google'/>Sign in with Google</a>
                    <Divider horizontal className='my-5'>VEYA</Divider>
                    <Form className='' onSubmit={formik.handleSubmit}>
                        <Form.Field error={formik.touched.username && formik.errors.username}>
                            <label>Kullanıcı adı</label>
                            <input id='username' type='text' placeholder='Kullanıcı adı'
                                   value={formik.values.username}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                            {formik.touched.username && formik.errors.username && (<div className='badge bg-danger mt-2'>{formik.errors.username}</div>)}
                        </Form.Field>
                        <Form.Field error={formik.touched.password && formik.errors.password}>
                            <label>Şifre</label>
                            <input id='password' type='password' placeholder='Şifre'
                                   value={formik.values.password}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                            {formik.touched.password && formik.errors.password && (<div className='badge bg-danger mt-2'>{formik.errors.password}</div>)}
                        </Form.Field>
                        {error && (<div className='alert alert-danger'>{error.message}</div>)}
                        <Button type='submit' disabled={pending} color='violet' fluid>
                            {pending && (<span className='spinner-border spinner-grow-sm me-3'/>)}
                            GİRİŞ
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default Login;