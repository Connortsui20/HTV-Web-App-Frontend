import React, { useState } from 'react';

import { makeStyles } from "@material-ui/core/styles";

import CongratsImg from "./images/img_congratulations_2@3x.png";
import Airpods from "./images/airpodspng.png";
import DeliveryInfo from "./images/ic_delivery_information@3x.png"
import WrongRedemption from './images/img_wrong_redemption@3x.png'

import SubmitVoucher from './apiFunctions/SubmitVoucher';
import ValidateVoucher from './apiFunctions/ValidateVoucher';

import FormPage from './pages/FormPage';
import SuccessPage from './pages/SuccessPage';
import NoPageFound from './pages/NoPageFound';
import ErrorPage from './pages/ErrorPage';



import { useRoutes, A, useQueryParams, navigate } from "hookrouter";
import { SvgIcon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    container: {
        // border: "1px solid blue",
        // width: "20%",
        //!display: "flex",
        //!alignItems: "center",
        //!justifyContent: "center",

        backgroundImage: `url(${CongratsImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center",
        backgroundSize: "contain",

        //height: "100%",
        height: theme.spacing(100),
        // position: "relative",
        // border: "3px solid green",
        margin: "0",
    },

    errorContainer: {
        backgroundImage: `url(${WrongRedemption})`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center",
        backgroundSize: "contain",
        //height: "100%",
        height: theme.spacing(100),
        // position: "relative",
        // border: "3px solid green",
        margin: "0",
    },

    prize: {
        height: "100px",
        // width: "20%",
        // display: "flex",
        // marginRight: "auto",
        // marginLeft: "auto",
        // marginTop: "35%",
        // height: theme.spacing(20),
        // margin: "0",
        // position: "absolute",
        // top: "50%",
        // left: "50%",
        // msTransform: "translate(-50%, -50%)", //what is this
        // transform: "translate(-50%, -50%)",
    },

    form: { //form text box
        width: "100%",
        margin: theme.spacing(0, 0, 2, 0),
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

    formMargin: {
        margin: theme.spacing(5, 3, 0, 3),
    },

    submitMargin: {
        margin: theme.spacing(0, 3, 5, 3), //TODO change to padding
    },

    login: { //padding to table

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
        margin: theme.spacing(4, 0),
    },

    formHeader: {
        display: "flex",
        fontSize: "20px",
        color: "black",
        alignItems: "center",
        margin: theme.spacing(2, 1, 2, 1),
        // justifyContent: "center",

    },

    formTitle: {
        marginLeft: theme.spacing(2),
        fontWeight: "500",
        alignItems: "center",
    },

    formTextTitle: {
        color: "#1F48B2",
        fontWeight: "450",
        margin: theme.spacing(1, 0, 0, 0),
    },

    emptyButton: { //when there is not enough information in the text fields
        width: "100%",
        margin: theme.spacing(3, 0, 5, 0),
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
        margin: theme.spacing(3, 0, 5),
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

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    icon: {
        alignItems: "center",
        height: theme.spacing(5),
    },

    status: {
        color: "#00ACBA",
        margin: theme.spacing(3, 4),
    },




}));


//TODO just redo the entire css
function App() {

    const theme = useStyles();

    const [productImage, setProductImage] = useState(Airpods);
    const [productName, setProductName] = useState("AirPods Pro");
    const [voucherCode, setVoucherCode] = useState(""); //TODO make this a hook instead

    const [receiverInfo, setReceiverInfo] = useState({ block: "", floor: "", receiver: "", phone: "", }); //for after the receiver has submitted successfully
    const [voucherStatus, setVoucherStatus] = useState("");
    const [submitState, setSubmitState] = useState(false);

    const [error, setError] = useState("");


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

            // set receiver data
            // then change page to show all details

        } else {
            setError(updateError);
        }

    }

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
            setError(findError);
        }
    }

    const handleCloseError = () => {
        setError("");
        navigate("/error");
    }

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
                            DeliveryInfoIcon={DeliveryInfo}
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