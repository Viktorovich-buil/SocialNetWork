import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form'
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {createField, GetStringKeys, Input} from "../Common/FormsControls/FormControls";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import styles from '../Common/FormsControls/FormsControls.module.css'
import classes from './Login.module.css'
import logo from '../img/Logo2.png'
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";


const maxLength30 = maxLengthCreator(30);

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>
    = ({handleSubmit, error, captchaUrl}) => {
    return <form onSubmit={handleSubmit}>
        <div className={classes.input}>
            {createField<LoginFormValuesTypeKeys>('Email', "email",[required, maxLength30], Input)}
        </div>
        <div className={classes.input}>
            {createField<LoginFormValuesTypeKeys>( 'Password', "password", [required, maxLength30], Input, {type: 'password'})}
        </div>
        <div className={classes.text}>
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: 'checkbox'}, 'remember me')}
        </div>
        {captchaUrl && <img src={captchaUrl} alt={'captcha'}/>}
        {captchaUrl && createField<LoginFormValuesTypeKeys>('Enter symbols from image', 'captcha', [required], Input, {})}

        {error && <div className={styles.formSummeryError}>
            {error}
        </div>}
        <button className={classes.button}>
            Login
        </button>
    </form>
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm);


export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = GetStringKeys <LoginFormValuesType>


export const LoginPage: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()


    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return <div className={classes.signin}>
        <div className={classes.block}>
            <div>
                <img className={classes.logimg} src={logo} alt='Logo'/>
            </div>
            <h1 className={classes.maintext}>Sign in to a Social Network</h1>

            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>

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



