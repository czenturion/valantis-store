import { API } from "@/shared/api/api"
import { onlyUnique } from "@/shared/helpers/onlyUnique"

const limit = 50

export const fetchIds = async (setCurrentIds, offset, setLoading, retries = 1) => {
    if (setLoading) setLoading(true)
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
    // при findItems, currentIds не пустой и не срабатывает
    if (currentIds?.length > 0) {
        try {
            const res = await API.get_items(currentIds)
            setCurrentItems(res)
        } catch (er) {
            if (retries > 0) {
                console.error('Error fetching items: ', er)
                await fetchItems(currentIds, setCurrentItems, retries - 1)
            }
        }
    }
    if (setLoading) setLoading(false)
}

export const findItems = async (field, value, setCurrentIds, setLoading, retries = 1) => {
    if (setLoading) setLoading(true)
    try {
        const res = await API.filter(field, value)
        setCurrentIds(res.filter(onlyUnique))
    } catch (er) {
        if (retries > 0) {
            console.error('Finding items error: ', er)
            await findItems(field, value, setCurrentIds, setLoading, retries - 1)
        }
    }
}
