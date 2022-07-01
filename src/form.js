import axios from "./axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function useForm(values = {})
{
    let successCallbacks = []
    
    let errorCallbacks = []
    
    let initialFormValues = {}

    initialFormValues = values;

    const router = useRouter();

    const nulledErrors = {}

    Object.keys(values).forEach(key => {
        nulledErrors[key] = null
    })

    const [fields, setFields] = useState(values)
    const [errors, setErrors] = useState(nulledErrors)
    const [processing, setProcessing] = useState(false)
    const [response, setResponse] = useState(null)

    const submit = async (e) => {

        e.preventDefault()

        const endpoint = e.target.action 
            ? e.target.getAttribute('action')
            : router.asPath
        
        setProcessing(true)

        await axios.post(endpoint, fields)
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
        setFields(initialFormValues)
    }

    const bind = (e) => {
        set(e.target.name, e.target.value)
    }

    const set = (key, value) => {
        let payload = {...fields}
        payload[key] = value;
        setFields(payload)
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
    }, [fields])

    return {
        submit,
        bind,
        set,
        success,
        error,
        reset,     
        hasError,   
        fields,
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