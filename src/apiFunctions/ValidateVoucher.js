import axios from 'axios';


export default async function ValidateVoucher(code) {

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    let voucher = {};
    let findError = null;

    try {
        const { data } = await axios.get(`${BACKEND_URL}/vouchers/${code}`);
        //console.log("%c Voucher Valid: ", "color: green; font-weight: bold", data);
        voucher = data;
    } catch (error) {
        console.error("%c Voucher Not Valid, error: ", "color: yellow; font-weight: bold", error);
        findError = error;
    }

    return ({ //return object to use in App
        voucher,
        findError,
    });

}