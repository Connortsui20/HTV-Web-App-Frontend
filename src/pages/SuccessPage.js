export default function SuccessPage({ receiverInfo, voucherCode, productName, productImage, theme }) {

    return (
        <div>

            <div className={theme.congratsScreen}>
                <img className={theme.prize} src={productImage} alt="Prize" />
            </div>
            <div>
                {receiverInfo.block}
                {receiverInfo.floor}
                {receiverInfo.receiver}
                {receiverInfo.phone}
            </div>

            <div>
                voucher code is: {voucherCode}, product name is: {productName}
            </div>
        </div>

    );

}