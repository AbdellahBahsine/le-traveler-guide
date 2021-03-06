import './footer.styles.css';

import { useNavigate } from "react-router-dom";

import moment from 'moment';

const FooterComponent = ({posts}) => {

    const navigate = useNavigate();

    const handleClick = id => {
        navigate('/article/' + id);
    }

    return (
        <footer className="footer-component">
            <div className="footer-component__top">
                <div className="footer-component__about">
                    <h2 className="logo">Le Traveler Guide</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae ducimus aut corrupti quasi deleniti est possimus. Aperiam tenetur natus dolor saepe expedita totam.</p>
                </div>

                <div className="footer-component__latest-posts">
                    <h2>Latest Posts</h2>

                    {
                        posts?.data.slice(0,2).map(p => {
                            return(
                                <div className="post" key={p.id} onClick={() => handleClick(p.id)}>
                                    <div className="post__image">
                                        <img src={`https://letravelerguide.s3.eu-west-3.amazonaws.com/public/images/posts/${p.image}`} alt={p.title} />
                                    </div>

                                    <div className="post__content">
                                        <h3>{p.title}</h3>
                                        <span>{moment(p.created_at).format("MMMM Do YYYY")}</span>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

                <div className="footer-component__contact">
                    <h2>Contact Us</h2>
                    <div className="row">
                        <i className="fas fa-location-arrow"></i>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>

                    <div className="row">
                        <i className="fas fa-phone"></i>
                        <p>+212 689182363</p>
                    </div>

                    <div className="row">
                        <i className="fas fa-envelope"></i>
                        <p>info@letravelerguide.com</p>
                    </div>
                </div>
            </div>

            <div className="footer-component__bottom">
                <p>Copyright ??2022 All rights reserved</p>
            </div>
        </footer>
    )
}

export default FooterComponent;