import ReceiverForm from "../components/ReceiverForm";
import ErrorPopup from "../components/ErrorPopup";

import CongratsImg from "../images/img_congratulations_2@3x.png";


import { Typography } from "@material-ui/core";


export default function FormPage({ error, handleCloseError, code, checkVoucherStatus, voucherCode, submitForm, productName, productImage, theme }) {

    if (!voucherCode) {
        checkVoucherStatus(code);
    }

    return (
        <div>
            <ErrorPopup error={error} handleCloseError={handleCloseError} />
            {(voucherCode) ? (
                <div className={theme.background}>
                    <div className="container">
                        <img src={CongratsImg} alt="Prize" />
                    </div>
                    <div>
                        <ReceiverForm productName={productName} voucherCode={voucherCode} submitForm={submitForm} theme={theme} />
                    </div>
                </div>
            ) : (
                <div>
                    <div class="loader"></div>
                    <div>
                        <Typography className={theme.waiting} variant="h3">
                            Please Wait
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    );

}