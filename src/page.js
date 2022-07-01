import axios from "./axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

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