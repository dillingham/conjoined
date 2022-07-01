# Conjoined

React / NextJS Helper for Laravel Developers

## Pages

Call `usePage` from `/pages/users/[user].js` and a request to `/users/1` on your backend API will take place on mount and any data returned becomes asychronous props for your component. 


```jsx
import { usePage } from "conjoined"

export default User = () => {
    
    const {loading, user} = usePage();
    
    if(loading) {
        return <p>loading..</p>
    }

    return (
        <h1>{user.name}</h1>
    )
}
```
```php
Route::get('users/{user}', [UserController::class, 'show']);
```
```php
public function show(User $user)
{
    return [
        'user' => $user,
    ];
}
```

Using the same example but [server side rendered](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props):

```jsx
export { getServerSideProps } from "conjoined"

export default User = ({ user }) => {

    return (
        <h1>{user.name}</h1>
    )
}
```

This package follows a convention and maps the current route to the API.

So this example will automatically populate the right props based on the Laravel response.

## Forms

```jsx
import { useForm, Error } from "conjoined"

const form = useForm({
    name: '',
    email: '',
})

form.success(data => {    
    router.push(`/users/${data.id}`)
})

return (
    <form action="/users/new" onSubmit={form.submit}>
        <input
            name="name"
            onChange={form.bind}
            value={form.fields.name}
        />
        
        <Error value={form.errors.name} />

        <input
            name="email"
            onChange={form.bind}
            value={form.fields.email}
        />

        <Error value={form.errors.email} />

        <button type="submit">
            Create
        </button>
    </form>  
)