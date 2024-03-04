import { useState } from "react"
import s from "@/features/home/home.module.css"
import Image from "next/image"
import LeftArrow from "@/../public/icons/leftArrow.svg"
import RightArrow from "@/../public/icons/rightArrow.svg"
import Find from "@/../public/icons/find.svg"
import clsx from "clsx"
import { fetchIds, findItems } from "@/shared/api/requests"

const Header = ({ loading, setLoading, setCurrentPage, currentPage, setCurrentIds }) => {
    const [searchValue, setSearchValue] = useState('')

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        fetchIds(setCurrentIds, currentPage + 1, setLoading)
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1)
        fetchIds(setCurrentIds, currentPage - 1, setLoading)
    }

    const toFindItems = () => {
        if (searchValue.length > 0) {
            findItems(document.getElementById("selectField").value, searchValue, setCurrentIds, setLoading)
        }
    }

    const cn = {
        buttons: clsx(loading && s.disabled, s.buttons)
    }

    return <div className={cn.buttons}>
        <div className={s.pages}>
            <button disabled={loading} className={s.button} onClick={prevPage}>
                <Image src={LeftArrow} width={30} height={30} alt="leftArrow"/>
            </button>
            <button disabled={loading} className={s.button} onClick={nextPage}>
                <Image src={RightArrow} width={30} height={30} alt="rightArrow"/>
            </button>
        </div>
        <form>
            <div className={s.find}>
                <div className={s.select}>
                    <select name="field" id="selectField">
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