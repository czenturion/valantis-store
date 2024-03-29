import { API } from "@/shared/api/api"
import { onlyUnique } from "@/shared/helpers/onlyUnique"
import { LIMIT, RETRIES } from "@/shared/consts/consts"

export const fetchIds = async (setCurrentIds, offset, setLoading, retries = RETRIES) => {
    if (setLoading) setLoading(true)
    try {
        const res = await API.get_ids(offset, LIMIT)
        if (res.length > 0) setCurrentIds(res.filter(onlyUnique))
    } catch (er) {
        if (retries > 0) {
            console.error('Error fetching ids: ', er)
            await fetchIds(setCurrentIds, offset, setLoading, retries - 1)
        }
    }
}

export const fetchItems = async (currentIds, setCurrentItems, setLoading, retries = RETRIES) => {
    if (setLoading) setLoading(true)
    if (currentIds?.length > 0) {
        try {
            const res = await API.get_items(currentIds)
            setCurrentItems(res)
        } catch (er) {
            if (retries > 0) {
                console.error('Error fetching items: ', er)
                await fetchItems(currentIds, setCurrentItems, setLoading, retries - 1)
            }
        }
    } else {
        setCurrentItems([])
    }
    if (setLoading) setLoading(false)
}

export const fetchFields = async (offset, limit, setCurrentIds, setLoading, retries = RETRIES) => {
    if (setLoading) setLoading(true)
    try {
        const res = await API.get_fields('price', offset, limit)
        // setCurrentIds(res.filter(onlyUnique))
        console.log(res.length)
    } catch (er) {
        if (retries > 0) {
            console.error('Finding fields error: ', er)
            await fetchFields(offset, limit, setCurrentIds, setLoading, retries - 1)
        }
    } finally {
        if (setLoading) setLoading(false)
    }
}

export const findItems = async (field, value, setCurrentIds, setLoading, setTotalIds, retries = RETRIES) => {
    if (setLoading) setLoading(true)
    try {
        const res = await API.filter(field, value)
        setTotalIds(res.result.filter(onlyUnique))
    } catch (er) {
        if (retries > 0) {
            console.error('Finding items error: ', er)
            await findItems(field, value, setCurrentIds, setLoading, setTotalIds, retries - 1)
        }
    }
}
