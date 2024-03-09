import { useEffect, useState } from "react"
import Home from '@/features/home'
import MainAppLayout from "@/widgets/layouts/mainLayout"
import { fetchIds, fetchItems } from "@/shared/api/requests"
import initChoices from "@/shared/scripts/choicesInit"

const HomePage = () => {
    const [currentIds, setCurrentIds] = useState([])
    const [currentItems, setCurrentItems] = useState([])
    const [currentOffset, setCurrentOffset] = useState(50)
    const [foundIds, setFoundIds] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchIds(setCurrentIds, 0, setLoading)
        initChoices("#selectField")
    }, [])

    useEffect(() => {
        fetchItems(currentIds, setCurrentItems, setLoading)
    }, [currentIds])

    useEffect(() => {
        if (foundIds !== undefined) {
            setCurrentIds(foundIds.slice(0, 50))
        }
    }, [foundIds])

    return <MainAppLayout>
        <Home currentItems={currentItems} foundIds={foundIds} setFoundIds={setFoundIds} setCurrentIds={setCurrentIds} currentOffset={currentOffset} setCurrentOffset={setCurrentOffset} loading={loading} setLoading={setLoading} />
    </MainAppLayout>
}

export default HomePage