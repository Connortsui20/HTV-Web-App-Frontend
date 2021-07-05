export default function SuccessPage({ receiverInfo, voucherStatus, voucherCode, productName, productImage, theme }) {

    return (
        <div>

            <div className={theme.container}>
                <img className={theme.prize} src={productImage} alt="Prize" />
            </div>
            <div>
                {receiverInfo.block}
                {receiverInfo.floor}
                {receiverInfo.receiver}
                {receiverInfo.phone}
            </div>
            <div>
                voucher status is: {voucherStatus}
            </div>
            <div>
                voucher code is (dont need): {voucherCode}, product name is: {productName}
            </div>
        </div>

    );

}