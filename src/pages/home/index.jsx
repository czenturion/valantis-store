import { useEffect, useState } from "react"
import Home from '@/features/home'
import MainAppLayout from "@/widgets/layouts/mainLayout"
import { fetchIds, fetchItems } from "@/shared/api/requests"
import { Loader } from "@/features/loader"

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
        console.log(currentIds, 'currentIds+++++++++')
    }, [currentIds])

    return <MainAppLayout>{
        !loading ? <Home currentItems={currentItems} setCurrentIds={setCurrentIds} currentPage={currentPage} setCurrentPage={setCurrentPage} loading={loading} setLoading={setLoading} />
     : <Loader width={100} height={100}/>}</MainAppLayout>
}

export default HomePage