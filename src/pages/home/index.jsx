import { useEffect, useState } from "react"
import Home from '@/features/home'
import MainLayout from "@/widgets/layouts/mainLayout"
import { fetchIds, fetchItems } from "@/services/api/requests"

const HomePage = () => {
    const [currentIds, setCurrentIds] = useState([])
    const [currentItems, setCurrentItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchIds(setCurrentIds, currentPage, setLoading)
    }, [])

    useEffect(() => {
        fetchItems(currentIds, setCurrentItems, setLoading)
    }, [currentIds])

    return <MainLayout>
        <Home currentItems={currentItems} setCurrentIds={setCurrentIds} currentPage={currentPage} setCurrentPage={setCurrentPage} loading={loading} setLoading={setLoading} />
    </MainLayout>
}

export default HomePage