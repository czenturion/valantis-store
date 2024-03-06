import { useState } from "react"
import s from "@/features/home/home.module.css"
import Image from "next/image"
import LeftArrow from "@/../public/icons/leftArrow.svg"
import RightArrow from "@/../public/icons/rightArrow.svg"
import Find from "@/../public/icons/find.svg"
import clsx from "clsx"
import { fetchIds, findItems } from "@/shared/api/requests"
import { OFFSET } from "@/shared/consts/consts"

const Header = ({ loading, setLoading, totalIds, setTotalIds, currentOffset, setCurrentOffset, setCurrentIds }) => {
    const [searchValue, setSearchValue] = useState('')

    const prevPage = () => {
        setCurrentOffset(currentOffset - OFFSET)
        fetchIds(setCurrentIds, currentOffset - OFFSET, setLoading)
    }

    const nextPage = () => {
        if (totalIds.length > 0) {
            setCurrentOffset(currentOffset + OFFSET)
            setTotalIds(totalIds.slice(OFFSET))
        } else {
            setCurrentOffset(currentOffset + OFFSET)
            fetchIds(setCurrentIds, currentOffset + OFFSET, setLoading)
        }
    }

    const toFindItems = () => {
        if (searchValue.length > 0) {
            findItems(document.getElementById("selectField").value, searchValue, setCurrentIds, setLoading, setTotalIds)
        } else {
            setCurrentOffset(0)
            setTotalIds([])
            fetchIds(setCurrentIds, 0, setLoading)
        }
    }

    const cn = {
        buttons: clsx(loading && s.disabled, s.buttons),
        leftArrowBtn: clsx(currentOffset === 0 && s.disabled, s.button),
        rightArrowBtn: clsx(searchValue.length !== 0 && totalIds.length <= OFFSET && s.disabled, s.button),
    }

    return <div className={cn.buttons}>
        <div className={s.pages}>
            <button disabled={loading} className={cn.leftArrowBtn} onClick={prevPage}>
                <Image src={LeftArrow} width={30} height={30} alt="leftArrow"/>
            </button>
            <button disabled={loading} className={cn.rightArrowBtn} onClick={nextPage}>
                <Image src={RightArrow} width={30} height={30} alt="rightArrow"/>
            </button>
        </div>
        <form>
            <div className={s.find}>
                <div className={s.select}>
                    {/* inline styles for soft render, should to find out about it */}
                    <select name="field" id="selectField" style={{height: 40, width: 160, border: "none", paddingLeft: 40, borderRadius: 6}}>
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
    </div>

}

export default Header