import s from "@/features/home/home.module.css"
import Item from "@/features/item"
import { Loader } from "@/features/loader"
import clsx from "clsx"
import Header from "@/features/header"

const Home = ({ loading, currentItems, ...rest }) => {
    const { result } = currentItems

    const cn = {
        contentItems: clsx(loading && s.loading, result?.length > 0 && s.contentItems)
    }

    return <div className={s.content}>
        <Header loading={loading} {...rest} />
        <div className={cn.contentItems}>
            {
                !loading
                    ? result?.length > 0
                        ? result.map((item, i) => <Item key={i} item={item}/>)
                        : <div className={s.noItem}><strong>Ничего не найдено</strong></div>
                    : <Loader/>
            }
        </div>
    </div>
}

export default Home
