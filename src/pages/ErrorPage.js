import WrongRedemptionEn from '../images/img_wrong_redemption@3x.png'


export default function ErrorPage({language}) {

    //if specific language show different picture
    let errorPicture = "";

    if (language === "en") {
        errorPicture = WrongRedemptionEn;
    } else if (language === "cn") {
        errorPicture = "unknown";
    }

    return (
        <div >
            <img className="error" src={errorPicture} alt={language} />
        </div>
    );

}