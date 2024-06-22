import { useTranslation } from "react-i18next"

export default function Home() {
    const [t, i18n] = useTranslation("global");

    return (
        <div>
            <p>{t("lng")}</p>
        </div>
    )
}
