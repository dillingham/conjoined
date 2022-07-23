import axios from "./axios";
import { useRouter } from "next/router";
import react, { useState, useEffect } from "react";

export function useForm(initial = {})
{
    let successCallbacks = []
    
    let errorCallbacks = []
    
    let initialFormValues = {}

    initialFormValues = initial;

    const router = useRouter();

    const nulledErrors = {}

    Object.keys(initial).forEach(key => {
        nulledErrors[key] = null
    })

    const [values, setValues] = useState(initial)
    const [errors, setErrors] = useState(nulledErrors)
    const [processing, setProcessing] = useState(false)
    const [response, setResponse] = useState(null)

    const submit = async (e) => {

        e.preventDefault()

        const endpoint = e.target.action 
            ? e.target.getAttribute('action')
            : router.asPath
        
        setProcessing(true)

        let formData = new FormData();

        // node env form data issue
        // https://github.com/axios/axios/issues/789

        Object.keys(values).forEach(key => {        
            e.target.elements[key].type === 'file'
                ? formData.set(key, e.target.elements[key].files[0])
                : formData.set(key, values[key])
        })

        console.log(e)

        await axios.post(endpoint, formData)
            .then(res => {
                setResponse(res)
                successCallbacks.forEach(callback => callback(res.data))
            }).catch(errors => {
                setErrors(errors.response.data.errors)
                errorCallbacks.forEach(callback => callback(errors))
            }).finally(() => {
                setProcessing(false)
            })
    }

    const reset = () => {
        setValues(initialFormValues)
    }

    const bind = (e) => {
        set(e.target.name, e.target.value)
    }

    const set = (key, value) => {
        let payload = {...values}
        payload[key] = value;
        setValues(payload)
    }

    const hasError = (key) => {
        return errors[key] != null
    }

    const success = (callback) => {
        successCallbacks.push(callback)
    }
    
    const error = (callback) => {
        errorCallbacks.push(callback)
    }

    useEffect(() => {
        setErrors(nulledErrors)
    }, [values])

    return {
        submit,
        bind,
        set,
        success,
        error,
        reset,     
        hasError,   
        values,
        processing,
        response,
        errors,
    }
}

export function Error({ value, className = 'text-red-500 text-sm', ...props }) {    
    if(value && typeof value !== 'string') {
        return <p className={className} {...props}>{ value[0] }</p>
    } else if(value) {
        return <p className={className} {...props}>{ value }</p>
    }

    return <span />
}