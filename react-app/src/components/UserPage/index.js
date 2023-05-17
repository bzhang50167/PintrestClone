import { useSelector } from "react-redux"
import './user.css'
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"

const UserPage = () => {
    const user = useSelector(state => state.session.user)
    const { id } = useParams()

    console.log(user, 'user');
    console.log(id, 'param id');
    return (
        <div className="page">
            <div className="page">
                <div>
                    <img className="profile-image" src={user.profilePic} />
                    <div className="nameofuser">
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="username">
                        @{user.username}
                    </div>
                    {user.id === +id ? (
                        <div className="outeredit">
                            <div className="editbutton">
                                <button className="button">
                                    Edit Profile
                                </button>
                            </div>
                            <div className="editbutton">
                                <button className="button">
                                    Create Board
                                </button>
                            </div>
                        </div>
                    ) : ''}
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage
