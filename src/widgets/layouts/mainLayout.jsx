import s from "@/widgets/layouts/mainLayout.module.css"

const MainAppLayout = ({ children }) => {
    return (
            <main className={s.main}>
                { children }
            </main>

    )
}

export default MainAppLayout