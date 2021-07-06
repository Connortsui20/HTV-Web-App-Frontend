import React, { useState } from 'react';

import { makeStyles } from "@material-ui/core/styles";

import CongratsImg from "./images/img_congratulations_2@3x.png";

import SubmitVoucher from './apiFunctions/SubmitVoucher';
import ValidateVoucher from './apiFunctions/ValidateVoucher';

import FormPage from './pages/FormPage';
import SuccessPage from './pages/SuccessPage';
import NoPageFound from './pages/NoPageFound';
import ErrorPage from './pages/ErrorPage';

import { useRoutes, A, navigate } from "hookrouter";


const useStyles = makeStyles((theme) => ({

    form: {
        padding: theme.spacing(2, 4, 4, 4),
        backgroundColor: "white",
    },
   
    formText: { //form text box
        width: "100%",
        //backgroundColor: "red",
        // color: "red",
    },

    formInput: { //Form text color
        fontWeight: "400",
        color: "black",
    },

    formInputBackground: {
        backgroundColor: "white",
        position: "relative",
        margin: "0 auto",
    },

    formHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(2, 5),
    },

    formTitle: {
        marginLeft: theme.spacing(2),
        //fontSize: "20px",
        color: "black",
        fontWeight: "500",
        alignItems: "center",
    },

    formTextTitle: {
        color: "#1F48B2",
        fontWeight: "450",
        margin: theme.spacing(1, 0, 0, 0),
    },

    formEntry: {
        margin: theme.spacing(2, 0),
    },
    
    submitMargin: {
        padding: theme.spacing(0, 3, 5, 3), 
    },

    background: {
        backgroundColor: "#EDF4FD",
    },

    title: { //"Login"
        display: "flex",
        fontWeight: "450",
        fontSize: "25px",
        color: "black",
        // alignItems: "center",
        // justifyContent: "center",
        //margin: theme.spacing(1, 0, 1, 0),

    },

    titleMargin: {
        margin: theme.spacing(3, 4),
    },


    buttonBackground: {
        backgroundColor: "white",
        padding: theme.spacing(0, 4),
        marginTop: theme.spacing(5),
    },
    
    emptyButton: { //when there is not enough information in the text fields
        width: "100%",
        margin: theme.spacing(5, 3, 5, 0),
        color: "white",
        textTransform: "none",
        backgroundColor: "#B4B4B4",
        "&:hover": { //on hover
            backgroundColor: "#D7DCDF",
            color: "#white",
        }
    },

    button: { //* needs to be the same as emptyButton except different backgroundColor
        width: "100%",
        margin: theme.spacing(5, 3, 5, 0),
        color: "white",
        textTransform: "none",
        backgroundColor: "#FF7514",
        "&:hover": { //on hover
            backgroundColor: "#FFAD08",
            color: "#white",
        }
    },

    errorText: { //error message
        color: "red",
        margin: theme.spacing(0, 1, 0),
    },

    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    icon: {
        alignItems: "center",
        height: theme.spacing(3),
    },

    status: {
        display: "flex",
        alignItems: "center",
        color: "#00ACBA",
        padding: theme.spacing(2, 3, 0, 3),
    },

    waiting: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: theme.spacing(10, 0),
    },

}));


function App() {

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const theme = useStyles();

    const [productImage, setProductImage] = useState("");
    const [productName, setProductName] = useState("AirPods Pro");
    const [voucherCode, setVoucherCode] = useState(""); 

    const [receiverInfo, setReceiverInfo] = useState({ block: "", floor: "", receiver: "", phone: "", }); //for after the receiver has submitted successfully
    const [voucherStatus, setVoucherStatus] = useState("");
    const [submitState, setSubmitState] = useState(false);

    const [error, setError] = useState("");


    const checkVoucherStatus = async (code) => {

        const { voucher, findError } = await ValidateVoucher(code);
        if (!findError) { //! !findError bc I have no idea if its null or undefined
            setVoucherCode(code);
            setReceiverInfo({
                block: voucher.block,
                floor: voucher.floor,
                receiver: voucher.receiver,
                phone: voucher.phone,
            });
            setProductName(voucher.productName);
            setProductImage(BACKEND_URL+voucher.image.url)
            switch (voucher.status) { //? There is probably a better way to do this
                case "PENDING":
                    setVoucherStatus("PENDING");
                    break;
                case "SUBMITTED":
                    setVoucherStatus("SUBMITTED");
                    setSubmitState(true);
                    break;
                case "DELIVERING":
                    setVoucherStatus("DELIVERING");
                    setSubmitState(true);
                    break;
                case "DELIVERED":
                    setVoucherStatus("DELIVERED");
                    setSubmitState(true);
                    break;
                default:
                    console.error("something went wrong with the status");
            }
        } else {
            setError(findError); //? Do I need this?
            navigate("/error");
        }
    };


    const submitForm = async (voucherCode, details) => {
        const { newVoucher, updateError } = await SubmitVoucher(voucherCode, details);
        if (!updateError) {
            if (newVoucher.status === 'SUBMITTED') {
                setVoucherStatus("SUBMITTED");
                setReceiverInfo({
                    block: newVoucher.block,
                    floor: newVoucher.floor,
                    receiver: newVoucher.receiver,
                    phone: newVoucher.phone,
                });
                setSubmitState(true);
            } else {
                console.error("%c SOMETHING IS VERY WRONG", "color: green; font-weight: bold")
            }
        } else {
            setError(updateError);
        }
    };

    const handleCloseError = () => {
        setError("");
    };

    /******************************************************************************************* */

    const routes = { //all url routes
        "/voucher/:code": ({ code }) =>
            <div>
                {(!submitState) ?
                    (<div>

                        <FormPage
                            error={error} handleCloseError={handleCloseError}
                            code={code} checkVoucherStatus={checkVoucherStatus}
                            voucherCode={voucherCode} submitState={submitState} submitForm={submitForm}
                            productName={productName} productImage={productImage}
                            
                            theme={theme}
                        /> </div>) : (<SuccessPage receiverInfo={receiverInfo} voucherStatus={voucherStatus} voucherCode={voucherCode} productName={productName} productImage={productImage} theme={theme} />)}
            </div>,
        "/error": () => <ErrorPage />,
    };


    const routeResult = useRoutes(routes); //hook for hookrouter, routes are states that get changed by routeResult

    return (
        <div className="App">
            <A href={`/voucher/${voucherCode}`}></A>
            {routeResult || <NoPageFound />}
        </div>
    );
}

export default App;