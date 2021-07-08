import WrongRedemptionCn from '../images/img_wrong_redemption_cn@3x.png'
import WrongRedemptionEn from '../images/img_wrong_redemption_en@3x.png'


export default function ErrorPage({language}) {

    let errorPicture = "";

    if (language.includes("en")) {
        errorPicture = WrongRedemptionEn;
    } else {
        errorPicture = WrongRedemptionCn;
    }

    return (
        <div >
            <img className="error" src={errorPicture} alt={language} />
        </div>
    );

}