import { useEffect, useState } from "react"
import Home from '@/features/home'
import MainLayout from "@/widgets/layouts/mainLayout"
import { API } from "@/shared/api/api"
import { onlyUnique } from "@/shared/helpers/onlyUnique"

const HomePage = () => {
    const [currentIds, setCurrentIds] = useState([])
    const [currentItems, setCurrentItems] = useState([])

    useEffect(() => {
        try {
            API.get_ids(1, 50)
                .then(res => {
                    setCurrentIds(res.filter(onlyUnique))
                })
        } catch (er) {
            console.error(er)
        }
    }, [])

    useEffect(() => {
        if (currentIds?.length > 0) {
            API.get_items(currentIds).then(res => {
                setCurrentItems(res)
            })
        }
    }, [currentIds])

    return <MainLayout>
        <Home currentItems={currentItems} />
    </MainLayout>
}

export default HomePage