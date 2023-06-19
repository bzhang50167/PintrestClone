import ClipLoader from "react-spinners/ClipLoader";
import './loadingpage.css'

const Loadingpage = () => {
    return(
        <div className="loading-page">
            <ClipLoader
            loading={true}
            color="#36d7b7"
            size={150}
            />
        </div>
    )
}

export default Loadingpage
