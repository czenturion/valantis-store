import '@/styles/global.css'
import '@/styles/select.css'

export default function App({ Component, ...rest }) {

    return <Component {...rest} />
}