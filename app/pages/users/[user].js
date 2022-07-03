import {usePage} from 'conjoined'

export default function Home() {

  const {loading, user} = usePage();

  if(loading) {
    return 'Loading'
  }
  
  return (
      <div>
            <p data-test="user-id">
                id: { user.id }
            </p>
            <p data-test="user-name">
                name: { user.name }
            </p>
      </div>
  )
}
