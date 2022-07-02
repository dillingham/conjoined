# Conjoined

React / NextJS Helper for Laravel Developers

```
npm i conjoined
```

> This package assumes you already have a backend API setup with Laravel and a frontend app built with Next JS. If not, checkout the official [Laravel Breeze + Next.js](https://github.com/laravel/breeze-next) repo to get started.. makes getting started a breeze..

## Pages

Using this Laravel api endpoint & response for example:

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

#### Client Side Rendering

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

#### Server Side Rendering

The api is requested when the [server renders](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) the page and passes the response data as props. So /users/[user].js requests /users/1 automatically for you.


```jsx
export { getServerSideProps } from "conjoined"

export default User = ({ user }) => {

    return (
        <h1>{user.name}</h1>
    )
}
```

## Forms

The following form hook makes reactive forms as simple as declaring the values and binding to inputs.

More docs coming soon for the various form helper methods like `form.reset()`

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
```

## Contributing

I added cypress to test end to end with Next.js within `/app`

```
npm run test
```