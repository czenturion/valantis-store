import { API } from "@/shared/api/api"
import { onlyUnique } from "@/shared/helpers/onlyUnique"

const limit = 50

export const fetchIds = async (setCurrentIds, offset, setLoading, retries = 1) => {
    if (setLoading) {
        setLoading(true)
    }
    try {
        const res = await API.get_ids(offset, limit)
        setCurrentIds(res.filter(onlyUnique))
    } catch (er) {
        if (retries > 0) {
            console.error('Error fetching ids: ', er)
            await fetchIds(setCurrentIds, offset, retries - 1)
        }
    }
}

export const fetchItems = async (currentIds, setCurrentItems, setLoading, retries = 1) => {
    if (currentIds?.length > 0) {
        try {
            const res = await API.get_items(currentIds)
            setCurrentItems(res)
        } catch (error) {
            if (retries > 0) {
                console.error('Error fetching items: ', error)
                await fetchItems(currentIds, setCurrentItems, retries - 1)
            }
        }
    }
    if (setLoading) {
        setLoading(false)
    }
}
