import React from "react"

import Button from "@material-ui/core/Button";

import { useTranslation } from "react-i18next";
import "../i18n.js";


export default function ChangeLanguage({ language, languageChange, theme }) {


    const { t } = useTranslation();

   // if language then highlight

    //TODO highlight whichever button is right
    return (
        <div className={theme.header}>
            <div> 
                <Button className={theme.headerButton} onClick={() => languageChange("en")}>EN</Button>
                <Button className={theme.headerButton} onClick={() => languageChange("cn")}>简</Button>
            </div>
        </div>
    );

}