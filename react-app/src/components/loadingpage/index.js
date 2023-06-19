import ClipLoader from "react-spinners/ClipLoader";
import './loadingpage.css'

const Loadingpage = () => {
    return(
        <div className="loading-page">
            <ClipLoader
            loading={true}
            color="#c161d4"
            size={175}
            />
        </div>
    )
}

export default Loadingpage
