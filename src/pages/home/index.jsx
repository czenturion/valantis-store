import { useEffect, useState } from "react"
import Home from '@/features/home'
import MainAppLayout from "@/widgets/layouts/mainLayout"
import { fetchIds, fetchItems } from "@/shared/api/requests"
import initChoices from "@/shared/scripts/choicesInit"

const HomePage = () => {
    const [totalIds, setTotalIds] = useState([])
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
        console.log(totalIds.length, totalIds)
    }, [currentIds])

    useEffect(() => {
        setCurrentIds(totalIds.slice(0, 50))
    }, [totalIds]);

    return <MainAppLayout>
        <Home currentItems={currentItems} totalIds={totalIds} setTotalIds={setTotalIds} setCurrentIds={setCurrentIds} currentOffset={currentOffset} setCurrentOffset={setCurrentOffset} loading={loading} setLoading={setLoading} />
    </MainAppLayout>
}

export default HomePage