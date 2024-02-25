import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { RouteNames } from '@/shared/const/routeNames'
import MainAppLayout from '@/widgets/layouts/mainLayout'

const Main = () => {
    const router = useRouter()

    useEffect(() => {
        router.push(RouteNames.HOME)
    }, [])

    return <></>
}

Main.getLayout = MainAppLayout
export default Main
