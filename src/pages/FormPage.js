import ReceiverForm from "../components/ReceiverForm"


export default function FormPage({ code, checkVoucherStatus, voucherCode, submitForm, productName, productImage, theme }) {

    checkVoucherStatus(code);

    return (
        <div>
            {(voucherCode !== "") ? (
                <div>
                    <div className={theme.congratsScreen}>
                        <img className={theme.prize} src={productImage} alt="Prize" />
                    </div>
                    <div>
                        <ReceiverForm productName={productName} voucherCode={voucherCode} submitForm={submitForm} theme={theme} />
                    </div>
                </div>
            ) : (
                <div>Voucher not valid</div>
            )}
        </div>
    );

}