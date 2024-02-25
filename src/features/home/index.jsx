import s from "@/features/home/home.module.css"
import Item from "@/features/item"
import { Loader } from "@/features/loader"

const Home = ({ currentItems }) => {

    console.log(currentItems, 'HOMEFEAT')

    return <div className={s.home}>
        <div className={s.content}>
            {
                currentItems.length > 0
                    ? currentItems.map((id, index) =>
                        <Item key={index} id={id}/>
                    )
                    : <Loader/>
            }
        </div>
    </div>
}

export default Home
