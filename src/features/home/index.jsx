import s from "@/features/home/home.module.css"
import Item from "@/features/item"
import { Loader } from "@/features/loader"
import { fetchIds, findItems } from "@/shared/api/requests"
import RightArrow from "@/../public/icons/rightArrow.svg"
import LeftArrow from "@/../public/icons/leftArrow.svg"
import Find from "@/../public/icons/find.svg"
import Image from "next/image"
import clsx from "clsx"

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
        findItems('product', "Золотое колье с бриллиантами и ониксом Pasquale Bruni", setCurrentIds, setLoading)
    }

    console.log(loading)

    const cn = {
        contentItems: clsx(loading && s.loading, result?.length > 0 && s.contentItems)
    }

    return <div className={s.content}>
        <div className={s.buttons}>
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
                    <select className={s.select}>
                        <option className={s.option} value="product">Название</option>
                        <option className={s.option} value="price">Цена</option>
                        <option className={s.option} value="brand">Брэнд</option>
                    </select>
                    <input className={s.findInput} type="text" placeholder="Поиск..."/>
                    <button className={s.button} onClick={toFindItems} type="button">
                        <Image src={Find} className={s.findIcon} width={25} height={25} alt="find"/>
                    </button>
                </div>
            </form>
        </div>
        <div className={cn.contentItems}>
            {
                !loading && result ? result.map((item, i) => <Item key={i} item={item}/>) :
                    <Loader width={100} height={100}/>
            }
        </div>
    </div>
}

export default Home
