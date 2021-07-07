import React from "react"

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useTranslation } from "react-i18next";
import "../i18n.js";


export default function ErrorPopup({ error, handleCloseError, theme }) {
    //openError is a boolean, true brings up the popup, false closes it
    //handleCloseError closes the error popup and resets the error

    const { t } = useTranslation();

    return (
        <div><Dialog
            open={!!error}
            onClose={handleCloseError}>
            <DialogTitle id="error">{t("Error")}</DialogTitle>
            <DialogContent><DialogContentText id="error description">
                {error.message}
            </DialogContentText></DialogContent>
            <DialogActions>
                <Button onClick={handleCloseError} autoFocus>
                    {t("Ok")}
                </Button>
            </DialogActions>
        </Dialog></div>
    );

}