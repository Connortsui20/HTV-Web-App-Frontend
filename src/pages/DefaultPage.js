


export default function DefaultPage({ code, ValidateVoucher, setVoucherCode }) {

    //const voucherCode
    
    const { voucher, findError } = ValidateVoucher(code);
    if (findError === null) {
        if (voucher.status === "PENDING") {
            console.log("Voucher is valid to be submitted");
            setVoucherCode(code);
        } else {
            console.log("Voucher is not valid, status is:", voucher.status);
        }
    } else {
        console.error("error with the voucher code", findError);
    }

    return (
       <div>Hello World, code is: {code}</div>
    
    );

}