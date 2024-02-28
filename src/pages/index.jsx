import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { RouteNames } from '@/shared/const/routeNames'

const Main = () => {
    const router = useRouter()

    useEffect(() => {
        router.push(RouteNames.HOME)
    }, [])

    return <></>
}

export default Main
