import ReceiverForm from "../components/ReceiverForm";
import ErrorPopup from "../components/ErrorPopup";


export default function FormPage({ error, handleCloseError, code, checkVoucherStatus, voucherCode, submitForm, productName, productImage, theme }) {

    if (!voucherCode) {
        checkVoucherStatus(code);
    }

    return (
        <div>
            <ErrorPopup error={error} handleCloseError={handleCloseError} />
            {(voucherCode) ? (
                <div className={theme.background}>
                    <div className={theme.container}>
                        <img className={theme.prize} src={productImage} alt="Prize" />
                    </div>
                    <div>
                        <ReceiverForm productName={productName} voucherCode={voucherCode} submitForm={submitForm} theme={theme} />
                    </div>
                </div>
            ) : (
                <div className={theme.errorContainer}>
                    PLEASE WAIT
                </div>
            )}
        </div>
    );

}