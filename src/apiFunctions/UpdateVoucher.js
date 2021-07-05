import axios from 'axios';


//? Is it updated by voucher ID or voucher Code? if voucher ID, then use built in update function
export default async function UpdateVoucher(voucherCode, details) {

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    let newVoucher = {};
    let updateError = null;
    const status = "Whatever you want it to be";

    try {
        const { data } = await axios.put(`${BACKEND_URL}/vouchers/updatestatus/${voucherCode}`, { //change based on voucher ID or code
            // block: details.block,
            // floor: details.floor,
            // receiver: details.receiver,
            // phone: details.phone,
            status: status,
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