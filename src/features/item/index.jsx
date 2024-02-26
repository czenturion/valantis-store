import s from "./item.module.css"

const Item = ({ item }) => {
    return <div className={s.item}>
        <p>{item.id}</p>
        <strong>{item.product}</strong>
        <p>Цена: {item.price} р.</p>
    </div>
}

export default Item