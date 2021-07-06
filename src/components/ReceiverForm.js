import React, { useState } from "react"

import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import DeliveryInfo from "../images/ic_delivery_information@3x.png"
import WinnerInfo from "../images/ic_winner_information@3x.png"

export default function ReceiverForm({ voucherCode, productName, submitForm, theme }) {

    const [details, setDetails] = useState({ block: "", floor: "", receiver: "", phone: "", });

    const submitLogin = (event) => {
        event.preventDefault(); //prevent page from re-rendering
        submitForm(voucherCode, details);
    }

    return (
        <div>

            <div>
                <div className={theme.titleMargin}>
                    <Typography className={theme.title}>{"Congratulations!"}</Typography>
                    <Typography className={theme.title}>{`Lucky draw wins ${productName}.`}</Typography>
                </div>
                <div className={theme.titleMargin}>
                    <Typography className={theme.title}>{"Please fill in the following information to arrange delivery to you."}</Typography>
                </div>
            </div>

            <form onSubmit={submitLogin} noValidate autoComplete="off" >

                <div>
                    <div className={theme.formHeader}>
                        <img className={theme.icon} src={DeliveryInfo} alt="Delivery Info" />
                        <Typography className={theme.formTitle}>{"Delivery information"}</Typography>
                    </div>

                    <div className={theme.form}>
                        <div className={theme.formEntry}>
                            <div>
                                <Typography className={theme.formTextTitle}>{"Building Block *"}</Typography>
                            </div>
                            <div> <FormControl required className={theme.formText}>
                                
                                <Select
                                    labelId="block"
                                    id="block"
                                    value={details.block}
                                    onChange={event => setDetails({ ...details, block: event.target.value })}
                                    className={theme.formInput} >
                                    <MenuItem value={"EAST"}>East</MenuItem>
                                    <MenuItem value={"WEST"}>West</MenuItem>
                                </Select>
                            </FormControl>
                            </div>
                        </div>
                        <div className={theme.formEntry}>
                            <div>
                                <Typography className={theme.formTextTitle}>{"Floor *"}</Typography>
                            </div>
                            <div >
                                <TextField required className={theme.formText} InputProps={{ className: theme.formInput }}
                                    type="floor" name="floor" id="floor"
                                    onChange={e => setDetails({ ...details, floor: e.target.value })} value={details.floor} />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={theme.formHeader}>
                        <img className={theme.icon} src={WinnerInfo} alt="Delivery Info" />
                        <Typography className={theme.formTitle}>{"Winner information"}</Typography>
                    </div>

                    <div className={theme.form}>
                        <div className={theme.formEntry}>
                            <div>
                                <Typography className={theme.formTextTitle}>{"Name *"}</Typography>
                            </div>
                            <div>
                                <TextField required className={theme.formText} InputProps={{ className: theme.formInput }}
                                    type="receiver" name="receiver" id="receiver" 
                                    onChange={e => setDetails({ ...details, receiver: e.target.value })} value={details.receiver} />
                            </div>
                        </div>
                        <div className={theme.formEntry}>
                            <div>
                                <Typography className={theme.formTextTitle}>{"Phone *"}</Typography>
                            </div>
                            <div>
                                <TextField required className={theme.formText} InputProps={{ className: theme.formInput }}
                                    type="phone" name="phone" id="phone"
                                    onChange={e => setDetails({ ...details, phone: e.target.value })} value={details.phone} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={theme.buttonBackground}>
                    {(details.block !== "" && details.floor !== "" && details.receiver !== "" && details.phone !== "")
                        ? (<Button className={theme.button} type="submit" value="Login" variant="contained">
                            <Typography variant="h6">Submit Form</Typography></Button>)
                        : (<Button className={theme.emptyButton} variant="contained">
                            <   Typography variant="h6">Submit Form</Typography></Button>)}
                </div>

            </form>

        </div>

    );

}