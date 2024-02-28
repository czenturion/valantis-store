import s from "@/features/home/home.module.css"
import Item from "@/features/item"
import { Loader } from "@/features/loader"
import { fetchIds, findItems } from "@/shared/api/requests"
import RightArrow from "@/../public/icons/rightArrow.svg"
import LeftArrow from "@/../public/icons/leftArrow.svg"
import Find from "@/../public/icons/find.svg"
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

    const toFindItems = () => {
        findItems('price', 10000, setCurrentIds, setLoading)
    }

    console.log(loading)

    return <div className={s.content}>
        <div className={s.buttons}>
            {/*<button disabled={loading && currentPage > 1} className={s.button} onClick={prevPage}><Image src={LeftArrow} alt="leftArrow"/></button>*/}
            {/*<button disabled={loading} className={s.button} onClick={nextPage}><Image src={RightArrow} alt="rightArrow"/></button>*/}
            <div className={s.pages}>
                <button disabled={loading} className={s.button} onClick={prevPage}>
                    <Image src={LeftArrow} width={30} height={30} alt="leftArrow"/>
                </button>
                <button disabled={loading} className={s.button} onClick={nextPage}>
                    <Image src={RightArrow} width={30} height={30} alt="rightArrow"/>
                </button>
            </div>
            <div className={s.find}>
                <input className={s.findInput} type="text" placeholder="Поиск..."/>
                <button className={s.button} onClick={toFindItems}>
                    <Image src={Find} className={s.findIcon} width={25} height={25} alt="find"/>
                </button>
            </div>
        </div>
        <div className={s.contentItems}>
            {
                result ? result.map((item, i) => <Item key={i} item={item}/>) : <Loader width={100} height={100}/>
            }
        </div>
    </div>
}

export default Home
