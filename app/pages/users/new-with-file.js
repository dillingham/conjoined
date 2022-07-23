import {useForm} from 'conjoined'
import { useState } from 'react'

const NewUser = () => {
    const [result, setResult] = useState({name: null})

    const form = useForm({
        name: '',
        email: '',
        avatar: ''
    })

    form.success((data) => {
        console.log(data)
        setResult({name: data.name})
    })

    return (
        <div>
            {result.name && <p data-test="result-name">Name: { result.name }</p>}

            <form action="/users/new" onSubmit={form.submit} encType="multipart/form-data">
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
                    name="avatar" 
                    type="file"
                    onChange={form.bind}
                    value={form.values.avatar}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
 
export default NewUser;