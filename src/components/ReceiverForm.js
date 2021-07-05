import React, { useState } from "react"

import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function ReceiverForm({ voucherCode, productName, submitForm, theme }) {

    const [details, setDetails] = useState({ block: "", floor: "", receiver: "", phone: "", });

    const submitLogin = (event) => {
        event.preventDefault(); //prevent page from re-rendering
        submitForm(voucherCode, details);
        console.log("Form Submitted");
    }

    return (
        <div>
            <div>
                <div><Typography className={theme.title}>{"Congratulations!"}</Typography></div>
                <div><Typography className={theme.title}>{`Lucky draw wins ${productName}.`}</Typography></div>
                <div><Typography className={theme.title}>{"Please fill in the following information to arrange delivery to you"}</Typography></div>
            </div>

            <form onSubmit={submitLogin} noValidate autoComplete="off" >
                <div>

                    <div><Typography className={theme.formTitle}>{"Delivery information"}</Typography></div>

                    <div> <FormControl required className={theme.form}>
                        <InputLabel id="demo-simple-select-required-label">Building Block</InputLabel>
                        <Select
                            labelId="block"
                            id="block"
                            value={details.block}
                            onChange={event => setDetails({ ...details, block: event.target.value })}
                            className={theme.formInput} >
                            <MenuItem value={"EAST"}>East</MenuItem>
                            <MenuItem value={"WEST"}>West</MenuItem>
                        </Select>
                    </FormControl> </div>

                    <div>
                        <TextField required className={theme.form} InputProps={{ className: theme.formInput }}
                            type="floor" name="floor" id="floor" label="Floor"
                            onChange={e => setDetails({ ...details, floor: e.target.value })} value={details.floor} />
                    </div>

                    <div><Typography className={theme.formTitle}>{"Winner information"}</Typography></div>

                    <div>
                        <TextField required className={theme.form} InputProps={{ className: theme.formInput }}
                            type="receiver" name="receiver" id="receiver" label="Name"
                            onChange={e => setDetails({ ...details, receiver: e.target.value })} value={details.receiver} />
                    </div>

                    <div>
                        <TextField required className={theme.form} InputProps={{ className: theme.formInput }}
                            type="phone" name="phone" id="phone" label="Phone Number"
                            onChange={e => setDetails({ ...details, phone: e.target.value })} value={details.phone} />
                    </div>

                    
                    {(details.block !== "" && details.floor !== "" && details.receiver !== "" && details.phone !== "")
                    ? (<Button className={theme.button} type="submit" value="Login" variant="contained">
                        <Typography variant="h6">Login Button</Typography></Button>)
                    : (<Button className={theme.emptyButton} variant="contained">
                        <   Typography variant="h6">Login Button</Typography></Button>)}


                </div>
            </form>
        </div>

    );

}