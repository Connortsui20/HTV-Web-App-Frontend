import React from "react"

import Button from "@material-ui/core/Button";

import { useTranslation } from "react-i18next";
import "../i18n.js";


export default function ChangeLanguage({ languageChange }) {


    const { t } = useTranslation();

    const buttonChange = (lng) => {
        languageChange(lng);
    }

    //highlight whichever button is right
    return (
        <div>
            <Button onClick={() => buttonChange("en")}>EN</Button>
            <Button onClick={() => buttonChange("cn")}>Chinese</Button>
        </div>
    );

}