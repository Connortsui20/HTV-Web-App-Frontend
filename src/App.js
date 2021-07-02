import React, { useState } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import CongratsImg from "./images/img_congratulations@3x.png";
import Airpods from "./images/airpodspng.png"

import ReceiverForm from "./ReceiverForm"
import SubmitVoucher from './apiFunctions/SubmitVoucher';

import FormPage from './FormPage';
import SuccessPage from './SuccessPage';

import { useRoutes, A, useQueryParams, navigate } from "hookrouter";

const useStyles = makeStyles((theme) => ({

    congratsScreen: {
        border: "1px solid blue",
        width: "20%",
        display: "flex",
        backgroundImage: `url(${CongratsImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center",
        // alignItems: "center",
        // justifyContent: "center", 
    },


    prize: {

        width: "20%",
        display: "flex",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: "60%",
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
    const voucherCode = "";

    const [receiverInfo, setReceiverInfo] = useState({ block: "", floor: "", receiver: "", phone: "", }); //for after the receiver has submitted successfully
    const [voucherStatus, setVoucherStatus] = useState("");
    const [submitState, setSubmitState] = useState(false);




    const submitForm = async (voucherCode, details) => {
        const { newVoucher, postError } = await SubmitVoucher(voucherCode, details);
        console.log(postError);
        if (postError === null) {
            if (newVoucher.status === 'SUBMITTED') {
                setVoucherStatus("SUBMITTED");
                setReceiverInfo({ 
                    block: newVoucher.block, 
                    floor: newVoucher.floor, 
                    receiver: newVoucher.receiver, 
                    phone: newVoucher.phone, });
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

    const routes = { //all url routes
        "/voucher/:code": ({code}) => 
        (!submitState) ?
        (<FormPage voucherCode={code} submitState={submitState} submitForm={submitForm} 
        productName={productName} productImage={productImage} theme={theme}
        />) : (<SuccessPage receiverInfo={receiverInfo} voucherCode={voucherCode} productName={productName} productImage={productImage} theme={theme}/>)
        
        ,
        "/error": () => <div>There is an error</div>,
    };


    const routeResult = useRoutes(routes); //hook for hookrouter, routes are states that get changed by routeResult

    return (
        <div className="App">
            <A href="/voucher/:code"></A>
            <A href="/error"></A>
        {routeResult}
        </div>
    );
}

export default App;
