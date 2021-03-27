import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import './toast.css';

function Toast(props) {
    return (
        <div className="toastContainer">
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} />
        </div >
    );
}

export {
    Toast,
    ToastsStore
};