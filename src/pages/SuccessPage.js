import React from "react"

import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import DeliveryInfo from "../images/ic_delivery_information@3x.png"
import WinnerInfo from "../images/ic_winner_information@3x.png"
import StatusInfo from "../images/ic_delivery_status@3x.png"

import CongratsImg from "../images/img_congratulations_2@3x.png";


export default function SuccessPage({ receiverInfo, voucherStatus, voucherCode, productName, productImage, theme }) {


    const deliveryMessage = (voucherStatus) => {
        let message = "";
        switch (voucherStatus) {
            case "PENDING":
                message = "Something is very wrong";
                console.error("There is a huge problem here")
                break;
            case "SUBMITTED":
                message = "Your gift has been submitted . . . ";
                break;
            case "DELIVERING":
                message = "Your gift is shipping . . . ";
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

            <div className="container">
                <img src={CongratsImg} alt="Prize" />
            </div>

            <div>
                <div className={theme.titleMargin}>
                    <Typography className={theme.title}>{"Congratulations!"}</Typography>
                    <Typography className={theme.title}>{`Lucky draw wins ${productName}.`}</Typography>
                </div>
            </div>

            <form noValidate autoComplete="off" >

                <div>
                    <div className={theme.formHeader}>
                        <img className={theme.icon} src={StatusInfo} alt="Delivery Status" />
                        <Typography className={theme.formTitle}>{"Delivery status"}</Typography>
                    </div>
                    <div className={theme.form}>
                        <div>
                            <Typography className={theme.status} variant="h5">{deliveryMessage(voucherStatus)}</Typography>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={theme.formHeader}>
                        <img className={theme.icon} src={DeliveryInfo} alt="Delivery Info" />
                        <Typography className={theme.formTitle}>{"Delivery information"}</Typography>
                    </div>

                    <div className={theme.form}>
                        <div className={theme.formEntry}>
                            <div>
                                <Typography className={theme.formTextTitle}>{"Building Block"}</Typography>
                            </div>
                            <div>
                                <TextField disabled className={theme.formText} InputProps={{ readOnly: true, }}
                                    type="block" name="block" id="block" defaultValue={receiverInfo.block}
                                />
                            </div>
                        </div>
                        <div className={theme.formEntry}>
                            <div>
                                <Typography className={theme.formTextTitle}>{"Floor"}</Typography>
                            </div>
                            <div >
                                <TextField disabled className={theme.formText} InputProps={{ readOnly: true, }}
                                    type="floor" name="floor" id="floor" defaultValue={receiverInfo.floor} />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={theme.formHeader}>
                        <img className={theme.icon} src={WinnerInfo} alt="Winner Info" />
                        <Typography className={theme.formTitle}>{"Winner information"}</Typography>
                    </div>

                    <div className={theme.form}>
                        <div className={theme.formEntry}>
                            <div>
                                <Typography className={theme.formTextTitle}>{"Name"}</Typography>
                            </div>
                            <div>
                                <TextField disabled className={theme.formText} InputProps={{ readOnly: true, }}
                                    type="receiver" name="receiver" id="receiver" defaultValue={receiverInfo.receiver} />
                            </div>
                        </div>
                        <div className={theme.formEntry}>
                            <div>
                                <Typography className={theme.formTextTitle}>{"Phone"}</Typography>
                            </div>
                            <div>
                                <TextField disabled className={theme.formText} InputProps={{ readOnly: true, }}
                                    type="phone" name="phone" id="phone" defaultValue={receiverInfo.phone} />
                            </div>
                        </div>
                    </div>
                </div>

            </form>

        </div>
    );

}