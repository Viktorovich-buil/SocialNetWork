import classes from "./Users.module.css";
import React from "react";
import {Formik, Field} from 'formik';
import {FilterType} from "../../redux/users-reducer";


const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type FormType = {
    term: string,
    friend: 'true' | 'false' | 'null'
}

type  PropsType = {
    onFilterChanged: (filter: FilterType) => void
}


export const UserSearchForm: React.FC<PropsType> = (props) => {
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
const filter: FilterType = {
    term: values.term,
    friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
}
        props.onFilterChanged(filter);
        setSubmitting(false);
    }
    return <div className={classes.searchform}>
        Search
        <Formik
            initialValues={{term: '', friend: 'null'}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="term"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.term}
                    />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </form>
            )}
        </Formik>
    </div>
}
