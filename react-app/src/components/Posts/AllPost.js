import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllPostThunk } from "../../store/post";
import './Post.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Masonry from "react-masonry-css";

const AllPost = () => {
    const allPost = useSelector(state => state.post.allPost)
    const posts = Object.values(allPost)
    const history = useHistory()
    const dispatch = useDispatch()
    console.log(allPost);
    console.log(posts, 'posts');

    useEffect(() => {
        dispatch(getAllPostThunk())
    }, [dispatch, allPost.length])

    const breakpointColumnsObj = {
        default: 4, // number of columns by default
        1200: 3, // number of columns for screens >= 1200px
        992: 2, // number of columns for screens >= 992px
        768: 1 // number of columns for screens >= 768px
    };

    return (
        <div>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="all-post-page"
                columnClassName="work-now"
            >
                {posts?.map(post => (
                    <div className="otherstuff" key={post?.id}>
                        <div
                            className="individual-post"
                            onClick={e => history.push(`/post/${post?.id}`)}
                        >
                            <img
                                className="cards-on-main"
                                src={post?.imageUrl}
                                alt="Post Image"
                            />
                        </div>
                    </div>
                ))}
            </Masonry>
        </div>
    )
}

export default AllPost
