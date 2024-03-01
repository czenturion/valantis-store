import instance from "@/shared/api/baseApi"

export const API = {
    get_ids(offset, limit) {
        return instance.post('', {
            "action": "get_ids",
            "params": {
                "offset": offset,
                "limit": limit
            }
        })
            .then(res => res.data.result)
            .catch(err => console.error(err))
    },
    get_items(arrayIds) {
        return instance.post('', {
            "action": "get_items",
            "params": {
                "ids": arrayIds
            }
        })
            .then(res => res.data)
    },
    get_fields(field, offset, limit) {
        return instance.post('', {
            "action": "get_fields",
            "params": {
                "field": field,
                "offset": offset,
                "limit": limit
            }
        })
            .then(res => res.data)

    },
    filter(field, value) {
        return instance.post('', {
            "action": "filter",
            "params": {
                [field.toString()]: value
            }
        })
            .then(res => res.data)
    }
}