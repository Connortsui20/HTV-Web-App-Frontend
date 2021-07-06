import WrongRedemption from '../images/img_wrong_redemption@3x.png'


export default function ErrorPage() {

    return (
        <div >
            <img className="error" src={WrongRedemption} alt="Prize" />
        </div>
    );

}