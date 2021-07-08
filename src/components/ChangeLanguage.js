import React from "react"

import Button from "@material-ui/core/Button";

import { useTranslation } from "react-i18next";
import "../i18n.js";


export default function ChangeLanguage({ language, languageChange, theme }) {


    const { t } = useTranslation();


    //! There is definitely a better way to do this I just don't know how
    return (
        <div className={theme.header}>
            <div>
                {(language.includes("cn")) ?
                    (<div>
                        <Button className={theme.headerButtonTrue} size="large" onClick={() => languageChange("cn")}>简</Button>
                        <Button className={theme.headerButtonFalse} size="large" onClick={() => languageChange("en")}>EN</Button> </div>)
                    :
                    (<div>
                        <Button className={theme.headerButtonFalse} size="large" onClick={() => languageChange("cn")}>简</Button>
                        <Button className={theme.headerButtonTrue} size="large" onClick={() => languageChange("en")}>EN</Button> </div>)
                }
            </div>
        </div >
    );

}