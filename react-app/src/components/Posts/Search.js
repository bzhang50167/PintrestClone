import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllPostThunk } from "../../store/post";
import './Post.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Masonry from "react-masonry-css";

const SearchPost = () => {
    const sessionUser = useSelector(state => state.session.user)
    const allPost = useSelector(state => state.post.searchPost)
    const posts = Object.values(allPost)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPostThunk())
    }, [dispatch, posts.length])


    if(!sessionUser){
        history.push('/')
    }

    const breakpointColumnsObj = {
        default: 4,
        1200: 3,
        992: 2,
        768: 1
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

export default SearchPost
