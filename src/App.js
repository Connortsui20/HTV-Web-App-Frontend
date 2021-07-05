import React, { useState } from 'react';

import { makeStyles } from "@material-ui/core/styles";

import CongratsImg from "./images/img_congratulations@3x.png";
import Airpods from "./images/airpodspng.png"

import SubmitVoucher from './apiFunctions/SubmitVoucher';
import ValidateVoucher from './apiFunctions/ValidateVoucher';

import FormPage from './pages/FormPage';
import SuccessPage from './pages/SuccessPage';
import NoPageFound from './pages/NoPageFound';

import { useRoutes, A, useQueryParams, navigate } from "hookrouter";

const useStyles = makeStyles((theme) => ({

    container: {
        // border: "1px solid blue",
        // width: "20%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundImage: `url(${CongratsImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center",
        backgroundSize: "contain",
        
        //height: "100%",
        height: theme.spacing(100),
        // position: "relative",
        border: "3px solid green",
        margin: "0",
    },

    prize: {

        // width: "20%",
        // display: "flex",
        // marginRight: "auto",
        // marginLeft: "auto",
        // marginTop: "60%",
        height: theme.spacing(20),
        // margin: "0",
        // position: "absolute",
        // top: "50%",
        // left: "50%",
        // msTransform: "translate(-50%, -50%)", //what is this
        // transform: "translate(-50%, -50%)",
    },

    form: { //form text box
        width: "100%",
        margin: theme.spacing(2, 0),
        color: "#D7DCDF",
    },

    formInput: { //Form text color
        color: "#5E646A",
    },

    login: { //padding to table
        padding: "0 10%",
    },

    title: { //"Login"
        display: "flex",
        fontWeight: 400,
        fontSize: "25px",
        color: "black",
        // alignItems: "center",
        // justifyContent: "center",
        margin: theme.spacing(2, 0),

    },

    formTitle: {
        display: "flex",
        fontWeight: 300,
        fontSize: "20px",
        color: "black",
        // alignItems: "center",
        // justifyContent: "center",
        margin: theme.spacing(3, 0, 0, 0),
    },

    emptyButton: { //when there is not enough information in the text fields
        width: "100%",
        margin: theme.spacing(3, 0, 5),
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
        backgroundColor: "#5093F2",
        "&:hover": { //on hover
            backgroundColor: "#0288D1",
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

}));


function App() {

    const theme = useStyles();

    const [productImage, setProductImage] = useState(Airpods);
    const [productName, setProductName] = useState("AirPods Pro");
    const [voucherCode, setVoucherCode] = useState(""); //TODO make this a hook instead

    const [receiverInfo, setReceiverInfo] = useState({ block: "", floor: "", receiver: "", phone: "", }); //for after the receiver has submitted successfully
    const [voucherStatus, setVoucherStatus] = useState("");
    const [submitState, setSubmitState] = useState(false);



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

            //handle error / return error page
        }

    }

    const checkVoucherStatus = async (code) => {

        const { voucher, findError } = await ValidateVoucher(code);
        if (!findError) { //! !findError bc I have no idea if its null or undefined
            setVoucherCode(code);
            // if (voucher.status === "PENDING") {
            //     console.log("Voucher is valid to be submitted, code:", code);
            //     setVoucherStatus("PENDING");
            //     setVoucherCode(code);
            // } else {
            //     console.log("Voucher is not valid, status is:", voucher.status);
            // }
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
            console.error("1error with the voucher code", findError);
        }

    }


    const routes = { //all url routes
        "/voucher/:code": ({ code }) =>
            (!submitState) ?
                (<FormPage code={code} checkVoucherStatus={checkVoucherStatus}
                    voucherCode={voucherCode} submitState={submitState} submitForm={submitForm}
                    productName={productName} productImage={productImage} theme={theme}
                />) : (<SuccessPage receiverInfo={receiverInfo} voucherStatus={voucherStatus} voucherCode={voucherCode} productName={productName} productImage={productImage} theme={theme} />)
        ,
        "/error": () => <div>There is an error</div>,
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

/* {(voucherCode !== "") ? <A href={`/voucher/${voucherCode}`}></A> :
            <A href={`/${voucherCode}`}></A>
            }*/