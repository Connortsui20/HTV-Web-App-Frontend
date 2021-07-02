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


export default function LoginForm({ theme }) {
    //Login sets email and password, thus opening the home page
    //loginError will show up if email and password are incorrect



    const [details, setDetails] = useState({ email: "", password: "" });

    const submitLogin = (event) => {
        event.preventDefault(); //prevent page from re-rendering
        console.log("Form Submitted")
    }

    const handleChange = () => { 
        age += 1; 
        console.log("age has changed:", age);
    }

    const loginError = "";
    let age = 10;

    return (
        <div>
            <div>
                <div><Typography className={theme.title}>{"Congratulations!"}</Typography></div>
                <div><Typography className={theme.title}>{"Lucky draw wins AirPods Pro."}</Typography></div>
                <div><Typography className={theme.title}>{"Please fill in the following information to arrange delivery to you"}</Typography></div>
            </div>

            <form onSubmit={submitLogin} noValidate autoComplete="off" >
                <div>
                    <div><Typography className={theme.formTitle}>{"Delivery information"}</Typography></div>

                    {(loginError !== "") ? (<div className={theme.errorText}>{<Typography variant="subtitle2">{loginError}</Typography>}</div>) : ""}

                    <div> <FormControl required className={theme.formControl}>
                        <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={age}
                            onChange={handleChange}
                            className={theme.selectEmpty}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"EAST"}>East</MenuItem>
                            <MenuItem value={"WEST"}>West</MenuItem>
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl></div>


                    <div>
                        <TextField required className={theme.form} InputProps={{ className: theme.formInput }}
                            type="email" name="email" id="email" label={"Email"} variant="outlined"
                            onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                    </div>

                    <div>
                        <TextField required className={theme.form} InputProps={{ className: theme.formInput }}
                            type="password" name="password" id="password" label={"Password"} variant="outlined"
                            onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                    </div>

                    {(details.email.length >= 3 && details.email.includes("@") && details.password.length >= 1)
                        ? (<Button className={theme.button} type="submit" value="Login" variant="contained">
                            <Typography variant="h6">{"Login Button"}</Typography></Button>)
                        : (<Button className={theme.emptyButton} variant="contained">
                            <   Typography variant="h6">{"Login Button"}</Typography></Button>)}

                </div>
            </form>
        </div>

    );

}