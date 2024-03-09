import { useState } from "react"
import s from "@/features/home/home.module.css"
import Image from "next/image"
import LeftArrow from "@/../public/icons/leftArrow.svg"
import RightArrow from "@/../public/icons/rightArrow.svg"
import Find from "@/../public/icons/find.svg"
import clsx from "clsx"
import { fetchIds, findItems } from "@/shared/api/requests"
import { MODE, OFFSET } from "@/shared/consts/consts"

const Header = ({ loading, setLoading, foundIds, setFoundIds, currentOffset, setCurrentOffset, setCurrentIds }) => {
    const [searchValue, setSearchValue] = useState('')
    const [mode, setMode] = useState(MODE.home)

    const prevPage = () => {
        setCurrentOffset(currentOffset - OFFSET)
        if (foundIds.length > 0) {
            setCurrentIds(foundIds.slice(currentOffset - OFFSET * 2, currentOffset - OFFSET))
        } else {
            fetchIds(setCurrentIds, currentOffset - OFFSET * 2, setLoading)
        }
    }

    const nextPage = () => {
        setCurrentOffset(currentOffset + OFFSET)
        if (foundIds.length > 0) {
            setCurrentIds(foundIds.slice(currentOffset, currentOffset + OFFSET))
        } else {
            fetchIds(setCurrentIds, currentOffset, setLoading)
        }
    }

    const toFindItems = () => {
        setMode(MODE.search)
        setCurrentOffset(OFFSET)
        if (searchValue.length > 0) {
            findItems(document.getElementById("selectField").value, searchValue, setCurrentIds, setLoading, setFoundIds)
        } else {
            fetchIds(setCurrentIds, 0, setLoading)
            setFoundIds([])
            setMode(MODE.home)
        }
    }

    const cn = {
        buttons: clsx(loading && s.disabled, s.buttons),
        leftArrowBtn: clsx(
            currentOffset === OFFSET && s.disabled,
            mode === MODE.search && currentOffset === OFFSET && s.disabled,
            s.button),
        rightArrowBtn: clsx(
            foundIds?.length < OFFSET && s.disabled && mode === MODE.search,
            foundIds?.length < currentOffset && s.disabled && mode === MODE.search,
            currentOffset >= foundIds?.length && mode === MODE.search && s.disabled, s.button),
    }

    return <div className={cn.buttons}>
        <form>
            <div className={s.find}>
                <div className={s.select}>
                    {/* inline styles for soft render, should to find out about it */}
                    <select name="field" id="selectField"
                            style={{height: 40, width: 160, border: "none", paddingLeft: 40, borderRadius: 6}}>
                        <option value="product">Название</option>
                        <option value="price">Цена</option>
                        <option value="brand">Брэнд</option>
                    </select>
                </div>
                <input className={s.findInput} id="#findInput" onChange={e => {
                    setSearchValue(e.currentTarget.value)
                }} type="text" placeholder="Поиск..."/>
                <button className={s.button} onClick={toFindItems} type="button">
                    <Image src={Find} className={s.findIcon} width={25} height={25} alt="find"/>
                </button>
            </div>
        </form>
        <div className={s.pages}>
            <button disabled={loading} className={cn.leftArrowBtn} onClick={prevPage}>
                <Image src={LeftArrow} width={30} height={30} alt="leftArrow"/>
            </button>
            <button disabled={loading} className={cn.rightArrowBtn} onClick={nextPage}>
                <Image src={RightArrow} width={30} height={30} alt="rightArrow"/>
            </button>
        </div>
    </div>

}

export default Header