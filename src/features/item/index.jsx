import s from "./item.module.css"
import { Loader } from "@/features/loader"
import { useEffect, useState } from "react"

const Item = ({ id, currentItems }) => {
    const [currentItem, setCurrentItem] = useState({})

    useEffect(() => {
        if (currentItems.length > 0) {
            setCurrentItem(currentItems.find(x => x.id === id))
            console.log(currentItem, 'item')
        }
    }, [])

    return <div className={s.item}>
        <p>{id}</p>
        {
            currentItem.length > 0
                ? <>
                    <div>{currentItem.product}</div>
                    <div>{currentItem.price}</div>
                </>
                : <Loader />
        }
        <p>Some text about item</p>
    </div>
}

export default Item