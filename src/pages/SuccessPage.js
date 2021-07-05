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

import DeliveryInfo from "../images/ic_delivery_information@3x.png"
import WinnerInfo from "../images/ic_winner_information@3x.png"
import StatusInfo from "../images/ic_delivery_status@3x.png"



export default function SuccessPage({ receiverInfo, voucherStatus, voucherCode, productName, productImage, theme }) {


    const deliveryMessage = (voucherStatus) => {
        let message = "";
        switch (voucherStatus) {
            case "PENDING":
                message = "Something is very wrong";
                console.error("There is a huge problem here")
                break;
            case "SUBMITTED":
                message = "Your gift has been submitted...";
                break;
            case "DELIVERING":
                message = "Your gift is shipping...";
                break;
            case "DELIVERED":
                message = "Your gift has shipped!";
                break;
            default:
                console.error("something went wrong with the status");
        }
        return (message);
    }



    return (
        <div className={theme.background}>
            <div className={theme.container}>
                <img className={theme.prize} src={productImage} alt="Prize" />
            </div>

            <div className={theme.submitMargin}>
                <div>
                    <div className={theme.titleMargin}>
                        <Typography className={theme.title}>{"Congratulations!"}</Typography>
                        <Typography className={theme.title}>{`Lucky draw wins ${productName}.`}</Typography>
                    </div>
                    <div className={theme.titleMargin}>
                        <Typography className={theme.title}>{"Do I need this here??"}</Typography>
                    </div>
                </div>

                <div className={theme.formHeader}>
                    <img className={theme.icon} src={StatusInfo} alt="Delivery Status" />
                    <Typography className={theme.formTitle}>{"Delivery status"}</Typography>
                </div>
                <div className={theme.formInputBackground}>
                    <div>
                        <Typography className={theme.status} variant="h5">{deliveryMessage(voucherStatus)}</Typography>
                    </div>
                </div>


                <form noValidate autoComplete="off" >
                    <div>

                        <div className={theme.formHeader}>
                            <img className={theme.icon} src={DeliveryInfo} alt="Delivery Info" />
                            <Typography className={theme.formTitle}>{"Delivery information"}</Typography>
                        </div>

                        <div className={theme.formInputBackground}>
                            <div>
                                <Typography className={theme.formTextTitle}>{"Building Block"}</Typography>
                            </div>
                            <div>
                                <TextField disabled className={theme.form} InputProps={{ readOnly: true, }}
                                    type="block" name="block" id="block" defaultValue={receiverInfo.block}
                                />
                            </div>
                            <div>
                                <Typography className={theme.formTextTitle}>{"Floor"}</Typography>
                            </div>
                            <div >
                                <TextField disabled className={theme.form} InputProps={{ readOnly: true, }}
                                    type="floor" name="floor" id="floor" defaultValue={receiverInfo.floor} />
                            </div>
                        </div>
                        <div className={theme.formHeader}>
                            <img className={theme.icon} src={WinnerInfo} alt="Delivery Info" />
                            <Typography className={theme.formTitle}>{"Winner information"}</Typography>
                        </div>

                        <div className={theme.formInputBackground}>
                            <div>
                                <Typography className={theme.formTextTitle}>{"Name"}</Typography>
                            </div>
                            <div>
                                <TextField disabled className={theme.form} InputProps={{ readOnly: true, }}
                                    type="receiver" name="receiver" id="receiver" defaultValue={receiverInfo.receiver} />
                            </div>
                            <div>
                                <Typography className={theme.formTextTitle}>{"Phone"}</Typography>
                            </div>
                            <div>
                                <TextField disabled className={theme.form} InputProps={{ readOnly: true, }}
                                    type="phone" name="phone" id="phone" defaultValue={receiverInfo.phone} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>

    );

}