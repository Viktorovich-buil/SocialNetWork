export type FieldValidatorTypes = (value: string) => string | undefined

export const required: FieldValidatorTypes = (value)=> {
    if (value) return undefined;
    return 'Field is required';
}



//THUNK
export const maxLengthCreator  = (maxLength: number): FieldValidatorTypes => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}
