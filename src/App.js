import React, { useState } from 'react';

import { makeStyles } from "@material-ui/core/styles";

import CongratsImg from "./images/img_congratulations@3x.png";
import Airpods from "./images/airpodspng.png"

import FormSubmit from "./FormSubmit"


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
        margin: theme.spacing(2, 0),
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

    const [voucherCode, setVoucherCode] = useState();

    const [status, setStatus] = useState();
    const [block, setBlock] = useState();
    const [floor, setFloor] = useState();
    const [receiver, setReceiever] = useState();
    const [phone, setPhone] = useState();

    const theme = useStyles();

    return (
        <div>
            <div className={theme.congratsScreen}>
                <img className={theme.prize} src={Airpods} alt="Prize" />
            </div>
            <div>
                <FormSubmit theme={theme} />
            </div>
        </div>
    );
}

export default App;
