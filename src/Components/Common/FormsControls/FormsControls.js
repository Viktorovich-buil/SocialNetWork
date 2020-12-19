import React from 'react';
import styles from './FormsControls.module.css';
import {Field} from "redux-form";


export const Area = Area => ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <Area {...input} {...props} />
            </div>
            <div>
                {hasError && <span> {error} </span>}
            </div>
        </div>
    );
};

export const createField = (component, placeholder, name, type, validate, text = '') => (
    <div>
        <Field component={component}
               placeholder={placeholder}
               name={name}
               type={type}
               validate={validate}/> {text}
    </div>
)

export const createFieldProfile = (placeholder, name, validate, component, props = {}, text = '') => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validate}
               component={component}
               {...props}
        /> {text}
    </div>
)

export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error: '')}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            <div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}
//
export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error: '')}>
            <div>
                <input className={styles.inputs} {...input} {...props}/>
            </div>
            <div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}
