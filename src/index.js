import axios from "./axios"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

let initialFormValues = {}

export function useForm(values)
{
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

    let callbacks = []

    const submit = async (e) => {

        e.preventDefault()

        const endpoint = e.target.action 
            ? e.target.getAttribute('action')
            : router.asPath
        
        setProcessing(true)

        await axios.post(endpoint, fields)
            .then(res => {
                setResponse(res)
                callbacks.forEach(callback => callback(res.data))
            }).catch(errors => {
                setErrors(errors.response.data.errors)
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
        callbacks.push(callback)
    }

    useEffect(() => {
        setErrors(nulledErrors)
    }, [fields])

    return {
        submit,
        bind,
        set,
        success,
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

export function usePage()
{
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    
    const get = async (endpoint = router.asPath) => {        
        await axios.get(endpoint)
            .then(res => setData(res.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    const api = {
        get,
    }

    useEffect(async () => {
            
        if(!router.isReady) {
            return;
        }
            
        api.get()
        
    }, [router.isReady, router.asPath])

    return {...data, loading, api};
}

export async function getServerSideProps(context) {

    let output = {}

    let endpoint = __filename
        .split('.next/server/pages/')[1]
        .replace('.js', '')

    const variables = [...endpoint.matchAll(/\[(\w+)\]/g)];

    variables.forEach(variable => {
        endpoint = endpoint.replace(
            variable[0], // [user]
            context.params[variable[1]] // user
        )
    })

    await axios.get(`/${endpoint}`, {
        headers: {
            'Cookie': context.req.headers.cookie,
        }
    }).then((response) => {
        output['props'] = response.data
    })

    return output;
}