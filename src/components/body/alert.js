import "./alert.scss";

const Alert = (props) => {
    const { isOpened, status, message, onClose } = props;


    return (
        <div className={`alert${isOpened ? "-block" : "-hidden"}`}>
            <span className="">
                <b className="capitalize">{status ? `${status}!` : "Alert!"}</b> {message ? message : "Alert message."}
            </span>
            <button className="" onClick={onClose}>
                <span>×</span>
            </button>
        </div>
    );
};

export default Alert;
