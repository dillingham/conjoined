import {useForm} from 'conjoined'
import { useState } from 'react'

const NewUser = () => {
    const [result, setResult] = useState({name: null})

    const form = useForm({
        name: '',
        email: '',
        active: true
    })

    form.success((data) => {
        setResult({name: data.name})
    })

    return (
        <div>
            {result.name && <p data-test="result-name">Name: { result.name }</p>}
            <form action="/users/new" onSubmit={form.submit}>
                <input 
                    name="name" 
                    onChange={form.bind}
                    value={form.values.name}
                />

                <input 
                    name="email" 
                    onChange={form.bind}
                    value={form.values.email}
                />

                <input 
                    name="active" 
                    type="checkbox"
                    onChange={form.bind}
                    value={form.values.active}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
 
export default NewUser;