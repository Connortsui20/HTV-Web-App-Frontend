import React, { useState } from 'react';

import { makeStyles } from "@material-ui/core/styles";

import CongratsImg from "./images/img_congratulations@3x.png";
import Airpods from "./images/airpodspng.png"

import ReceiverForm from "./ReceiverForm"
import SubmitVoucher from './apiFunctions/SubmitVoucher';


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



    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


    const [productImage, setProductImage] = useState(Airpods);
    const [productName, setProductName] = useState("AirPods Pro");
    const [voucherCode, setVoucherCode] = useState("191");

    const [receiverInfo, setReceiverInfo] = useState({ block: "", floor: "", receiver: "", phone: "", }); //for after the receiver has submitted successfully


    const theme = useStyles();

    const submitForm = async (details) => {
        const { newVoucher, error } = await SubmitVoucher(voucherCode, details);
        if (error === null) {
            if (newVoucher.status === 'SUBMITTED') {


            }

            // set receiver data
            // then change page to show all details

        } else {
            
            //handle error / return error page
        }

    }

    return (
        <div>
            <div className={theme.congratsScreen}>
                <img className={theme.prize} src={productImage} alt="Prize" />
            </div>
            <div>
                <ReceiverForm productName={productName} submitForm={submitForm} theme={theme} />
            </div>
        </div>
    );
}

export default App;
