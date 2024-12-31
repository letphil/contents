import { useTranslation } from "react-i18next";
import i18n from "./i18n";

export default function App() {
  const { t } = useTranslation();

  const changeLanguage = (lng: "ko" | "en") => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage("ko")}>ko</button>
      <button onClick={() => changeLanguage("en")}>en</button>
      <h1>{t("hello")}</h1>
    </div>
  );
}
