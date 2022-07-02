import {usePage} from 'conjoined'

export default function Home() {

  const {loading, user, meta} = usePage();

  if(loading) {
    return 'Loading'
  }
  
  return (
    <p>{ user.name }</p>
  )
}
