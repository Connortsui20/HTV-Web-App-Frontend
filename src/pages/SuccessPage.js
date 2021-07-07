import React from "react"

import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import DeliveryInfo from "../images/ic_delivery_information@3x.png"
import WinnerInfo from "../images/ic_winner_information@3x.png"
import StatusInfo from "../images/ic_delivery_status@3x.png"
import CongratsImg from "../images/img_congratulations@3x.png";


import { useTranslation } from "react-i18next";
import "../i18n.js";


export default function SuccessPage({ receiverInfo, voucherStatus, productName, productImage, theme }) {

    const { t } = useTranslation();

    const deliveryMessage = (voucherStatus) => {
        let message = "";
        switch (voucherStatus) {
            case "PENDING": //this should never happen
                message = "Something is very wrong";
                console.error("There is a huge problem here");
                break;
            case "SUBMITTED":
                message = t("Submitted");
                break;
            case "DELIVERING":
                message = t("Delivering");
                break;
            case "DELIVERED":
                message = t("Delivered");
                break;
            default: //this should never happen either
                console.error("something went wrong with the status");
        }
        return (message);
    }


    return (
        <div>

            

            <div className={theme.background}>

                <div className="container">
                    <div className="parent">
                        <img src={CongratsImg} alt="screen" />
                    </div>
                    <div className="child">
                        <img src={productImage} alt="prize" />
                    </div>
                </div>

                <div>
                    <div className={theme.titleMargin}>
                        <Typography className={theme.title}>{t("Congratulations")}</Typography>
                        <Typography className={theme.title}>{t("Gift Name")} {productName}</Typography>
                    </div>
                </div>

                <form noValidate autoComplete="off" >

                    <div>
                        <div className={theme.formHeader}>
                            <img className={theme.icon} src={StatusInfo} alt="Delivery Status" />
                            <Typography className={theme.formTitle}>{t("Delivery Status")}</Typography>
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
                            <Typography className={theme.formTitle}>{t("Delivery Information")}</Typography>
                        </div>

                        <div className={theme.form}>
                            <div className={theme.formEntry}>
                                <div>
                                    <Typography className={theme.formTextTitle}>{t("Building Block")}</Typography>
                                </div>
                                <div>
                                    <TextField disabled className={theme.formText} InputProps={{ readOnly: true, }}
                                        type="block" name="block" id="block" defaultValue={receiverInfo.block}
                                    />
                                </div>
                            </div>
                            <div className={theme.formEntry}>
                                <div>
                                    <Typography className={theme.formTextTitle}>{t("Floor")}</Typography>
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
                            <Typography className={theme.formTitle}>{t("Winner Information")}</Typography>
                        </div>

                        <div className={theme.form}>
                            <div className={theme.formEntry}>
                                <div>
                                    <Typography className={theme.formTextTitle}>{t("Name")}</Typography>
                                </div>
                                <div>
                                    <TextField disabled className={theme.formText} InputProps={{ readOnly: true, }}
                                        type="receiver" name="receiver" id="receiver" defaultValue={receiverInfo.receiver} />
                                </div>
                            </div>
                            <div className={theme.formEntry}>
                                <div>
                                    <Typography className={theme.formTextTitle}>{t("Phone")}</Typography>
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
        </div>
    );


}