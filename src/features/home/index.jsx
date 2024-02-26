import s from "@/features/home/home.module.css"
import Item from "@/features/item"
import { Loader } from "@/features/loader"
import {fetchIds} from "@/services/api/requests"
import RightArrow from "@/../public/icons/rightArrow.svg"
import LeftArrow from "@/../public/icons/leftArrow.svg"
import Image from "next/image"

const Home = ({ currentItems, setCurrentIds, currentPage, setCurrentPage, loading, setLoading }) => {
    const { result } = currentItems

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        fetchIds(setCurrentIds, currentPage + 1, setLoading)
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1)
        fetchIds(setCurrentIds, currentPage - 1, setLoading)
    }

    return <div className={s.content}>
        <div className={s.buttons}>
            <button disabled={currentPage <= 1 && loading} className={s.button} onClick={prevPage}><Image src={LeftArrow}/></button>
            <button disabled={loading} className={s.button} onClick={nextPage}><Image src={RightArrow}/></button>
        </div>
        <div className={s.contentItems}>
            {
                !loading && result ? result.map((item, i) => <Item key={i} item={item}/>) : <Loader width={100} height={100}/>
            }
        </div>
    </div>
}

export default Home
