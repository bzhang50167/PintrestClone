import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllPostThunk } from "../../store/post";
import './splash.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "./image";

const SplashPage = () => {
    const allPost = useSelector(state => state.post.allPost)
    const user = useSelector(state => state.session)
    const posts = Object.values(allPost)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPostThunk())
    }, [dispatch])

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 11,
            slidesToSlide: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 7,
            slidesToSlide: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    const image = posts.map(post => (
        <Image
            imgUrl={post.imageUrl}
        />
    ))

    if (user.user !== null) history.push('/home')

    return (
        <div className="spash-page">
            <div className="spash-page">
                <h1 className="spash-page">Mangterest: Where Every Page Unveils a New Adventure!</h1>
            </div>
            <Carousel
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2500}
                responsive={responsive}
            >
                {image}
            </Carousel>
        </div>
    )
}

export default SplashPage
