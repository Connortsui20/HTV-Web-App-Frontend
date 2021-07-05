import axios from 'axios';


export default async function SubmitVoucher(voucherCode, details) {

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    let newVoucher = {};
    let updateError = null;

    try {
        const { data } = await axios.put(`${BACKEND_URL}/vouchers/updatevoucher/${voucherCode}`, {
            block: details.block,
            floor: details.floor,
            receiver: details.receiver,
            phone: details.phone,
            status: "SUBMITTED",
        });
        console.log("%c Voucher Update Success: ", "color: green; font-weight: bold", data);
        newVoucher = data;
    } catch (error) {
        console.error("%c Voucher Update Failure: ", "color: yellow; font-weight: bold", error);
        updateError = error; 
    }

    return ({ //return object to use in App
        newVoucher,
        updateError,
    });

}