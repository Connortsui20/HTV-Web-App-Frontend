import ReceiverForm from "../components/ReceiverForm";
import ErrorPopup from "../components/ErrorPopup";
import ChangeLanguage from "../components/ChangeLanguage";

import CongratsImg from "../images/img_congratulations@3x.png";

import { Typography } from "@material-ui/core";

import { useTranslation } from "react-i18next";
import "../i18n.js";


export default function FormPage({ error, handleCloseError, code, checkVoucherStatus, voucherCode, submitForm, productName, productImage, languageChange, theme }) {

    const { t } = useTranslation();
    
    if (!voucherCode) {
        checkVoucherStatus(code);
    }

    return (
        <div>
            <ErrorPopup error={error} handleCloseError={handleCloseError} />
            <ChangeLanguage languageChange={languageChange}/>
            {(voucherCode) ? (
                <div className={theme.background}>
                    <div className="container">
                        <div className="parent">
                            <img src={CongratsImg} alt="screen" />
                        </div>
                        <div className="child">
                            <img src={productImage} alt="prize" />
                        </div>
                    </div>
                    <div>
                        <ReceiverForm productName={productName} voucherCode={voucherCode} submitForm={submitForm} theme={theme} />
                    </div>
                </div>
            ) : (
                <div>
                    <div>
                        <Typography className={theme.waiting} variant="h5">
                            {t("Loading")}
                        </Typography>
                    </div>
                    <div className="loader"></div>
                </div>
            )}
        </div>
    );

}