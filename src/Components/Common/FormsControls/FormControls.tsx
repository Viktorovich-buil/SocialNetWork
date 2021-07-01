import React from 'react';
import styles from './FormsControls.module.css';
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorTypes} from "../../../utils/validators/validators";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            <div>
                {hasError && <span> {error} </span>}
            </div>
        </div>
    );
};


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export function createField<FormKeysType extends string>(placeholder: string | undefined,
                                                         name: FormKeysType,
                                                         validate: Array<FieldValidatorTypes>,
                                                         component: React.FC<WrappedFieldProps>,
                                                         props = {},
                                                         text = '') {
    return <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validate}
               component={component}
               {...props}
        /> {text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>

// export const createFieldProfile = (placeholder: string,
//                                    name: string,
//                                    validate: Array<FieldValidatorTypes>,
//                                    component: React.FC<WrappedFieldProps>,
//                                    props = {},
//                                    text = '') => (
//     <div>
//         <Field placeholder={placeholder}
//                name={name}
//                validate={validate}
//                component={component}
//                {...props}
//         /> {text}
//     </div>
// )
//
// export const Textarea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
//     const hasError = meta.touched && meta.error;
//     return (
//         <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
//             <div>
//                 <textarea {...input} {...props}/>
//             </div>
//             <div>
//                 {hasError && <span>{meta.error}</span>}
//             </div>
//         </div>
//     )
// }
// //
// export const Input: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
//     const hasError = meta.touched && meta.error;
//     return (
//         <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
//             <div>
//                 <input className={styles.inputs} {...input} {...props}/>
//             </div>
//             <div>
//                 {hasError && <span>{meta.error}</span>}
//             </div>
//         </div>
//     )
// }
// export const Area: React.FC<AreaPropsType> = ({input, meta: {touched, error}, ...props})   => {
//     const hasError = touched && error;
//     return (
//         <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
//             <div>
//                 {/*{children}*/}
//                 <input {...input} {...props} />
//             </div>
//             <div>
//                 {hasError && <span> {error} </span>}
//             </div>
//         </div>
//     );
// };
//
// type AreaPropsType = {
//     input: string | null
//     meta: {
//         touched: boolean
//         error: string
//     }
// }
