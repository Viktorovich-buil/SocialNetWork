import React from 'react';
import {reduxForm} from 'redux-form'
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {createField, Input} from "../Common/FormsControls/FormControls";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import styles from '../Common/FormsControls/FormsControls.module.css'
import classes from './Login.module.css'
import logo from '../img/Logo2.png'
import {Redirect} from "react-router-dom";


const maxLength30 = maxLengthCreator(30);

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return <form onSubmit={handleSubmit}>
        <div className={classes.input}>
            {createField(Input, 'Email', "email", "text", [required, maxLength30])}
        </div>
        <div className={classes.input}>
            {createField(Input, 'Password', "password", "password", [required, maxLength30])}
        </div>
        <div className={classes.text}>
            {createField('Input', null, "rememberMe", "checkbox", null, 'Remember me')}
        </div>
        {captchaUrl && <img src={captchaUrl} alt={'captcha'}/>}
        {captchaUrl && createField('Input', 'Enter symbols from image', 'captcha', "text", [required])}

        {error && <div className={styles.formSummeryError}>
            {error}
        </div>}
        <button className={classes.button}>
            Login
        </button>
    </form>
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return <div className={classes.signin}>
        <div className={classes.block}>
            <div>
                <img className={classes.logimg} src={logo} alt='Logo'/>
            </div>
            <h1 className={classes.maintext}>Sign in to a Social Network</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
            <div className={classes.text}>
                <a href="https://social-network.samuraijs.com/signUp">Don't have an account? Sign Up</a>
            </div>
            <div className={classes.textsmall}>
                Vitaliy Shiryaev 2020 ©
                <a href="https://social-network.samuraijs.com/signUp"> Lessons "React-JS" by IT-KAMASUTRA</a>
            </div>
        </div>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login);

