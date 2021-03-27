import LoaderClass from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './loader.css';

function Loader(props) {
    return (
        <div className="customeLoaderContainer">
            <LoaderClass
                className={'customeLoader'}
                type="TailSpin"
                color="#00BFFF"
                height={50}
                visible={props.visible}
                width={50}
            />
        </div >
    );
}

export default Loader;