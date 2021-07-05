import ReceiverForm from "../components/ReceiverForm"


export default function FormPage({ voucherCode, submitState, submitForm, productName, productImage, theme }) {

    //const voucherCode
    

    return (
        <div >   
        
        <div className={theme.congratsScreen}>
            <img className={theme.prize} src={productImage} alt="Prize" />
        </div>
        <div>
            {(submitState) ? <div>make page for after it is submitted</div> : 
            <ReceiverForm productName={productName} voucherCode={voucherCode} submitForm={submitForm} theme={theme} />}
        </div>
    </div>
    
    );

}