import { useEffect, useState } from "react"
import Home from '@/features/home'
import MainAppLayout from "@/widgets/layouts/mainLayout"
import { fetchIds, fetchItems } from "@/shared/api/requests"
import initChoices from "@/shared/scripts/choicesInit"

const HomePage = () => {
    const [currentIds, setCurrentIds] = useState([])
    const [currentItems, setCurrentItems] = useState([])
    const [currentOffset, setCurrentOffset] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchIds(setCurrentIds, currentOffset, setLoading)
        initChoices("#selectField")
    }, [])

    useEffect(() => {
        fetchItems(currentIds, setCurrentItems, setLoading)
    }, [currentIds])

    return <MainAppLayout>
        <Home currentItems={currentItems} setCurrentIds={setCurrentIds} currentOffset={currentOffset} setCurrentOffset={setCurrentOffset} loading={loading} setLoading={setLoading} />
    </MainAppLayout>
}

export default HomePage