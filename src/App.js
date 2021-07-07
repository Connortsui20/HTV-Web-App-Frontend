import React, { useState } from 'react';

import { makeStyles } from "@material-ui/core/styles";

import SubmitVoucher from './apiFunctions/SubmitVoucher';
import ValidateVoucher from './apiFunctions/ValidateVoucher';

import FormPage from './pages/FormPage';
import SuccessPage from './pages/SuccessPage';
import NoPageFound from './pages/NoPageFound';
import ErrorPage from './pages/ErrorPage';
import ChangeLanguage from "./components/ChangeLanguage";


import { useRoutes, A, navigate } from "hookrouter";

import { useTranslation } from "react-i18next";
import "./i18n.js";

const useStyles = makeStyles((theme) => ({

    form: {
        padding: theme.spacing(2, 4, 4, 4),
        backgroundColor: "white",
    },

    formText: { //form text box
        width: "100%",
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

    background: {
        backgroundColor: "#EDF4FD",
    },

    title: {
        display: "flex",
        fontWeight: "450",
        fontSize: theme.spacing(3),
        color: "black",
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

    header: {
        padding: theme.spacing(2,3),
        textAlign: "right",
    },

    headerButtonTrue: { //! This is a really bad way of doing this but I don't know how else to
        color: "#1F48B2",
        fontWeight: "800",
        fontSize: theme.spacing(4),
        margin: theme.spacing(0, 1),
    },

    headerButtonFalse: {
        color: "black",
        fontWeight: "400",
        fontSize: theme.spacing(4),
        margin: theme.spacing(0, 1),
    },

}));


/********************************************************************************************/


function App() {

    const { t, i18n } = useTranslation();

    const languageChange = (lng) => {
        i18n.changeLanguage(lng);
        setLanguage(i18n.language);
    }

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const theme = useStyles();

    const [receiverInfo, setReceiverInfo] = useState({ block: "", floor: "", receiver: "", phone: "", }); //for after the receiver has submitted successfully
    const [productImage, setProductImage] = useState("");
    const [productName, setProductName] = useState("");
    const [submitState, setSubmitState] = useState(false);

    const [voucherCode, setVoucherCode] = useState("");
    const [voucherStatus, setVoucherStatus] = useState("");

    const [error, setError] = useState("");

    const [language, setLanguage] = useState("en"); //default en for now, //? Might be redundant not sure


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
            setProductName(voucher.product.productName);
            setProductImage(BACKEND_URL + voucher.product.image.url)
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

    /********************************************************************************************/

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
                            language={language} theme={theme}
                        /> </div>) : (<SuccessPage receiverInfo={receiverInfo} voucherStatus={voucherStatus}
                            productName={productName} productImage={productImage}
                            language={language} theme={theme} />)}
            </div>,
        "/error": () => <ErrorPage language={language}/>,
    };

    const routeResult = useRoutes(routes); //hook for hookrouter, routes are states that get changed by routeResult

    return (
        <div className="App">
            <ChangeLanguage language={language} languageChange={languageChange} theme={theme} />
            <A href={`/voucher/${voucherCode}`}></A>
            {routeResult || <NoPageFound />}
        </div>
    );
}

export default App;