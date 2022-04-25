import './articles.styles.css';

import { useNavigate } from "react-router-dom";

import moment from 'moment';
import Pagination from 'react-js-pagination';

const ArticlesComponent = ({posts, loadingArticles, setLoadingArticles, setPage}) => {

    const navigate = useNavigate();

    const handleClick = id => {
        navigate('/article/' + id);
    }

    return ( 
        <section id="articles" className="articles-component">
                {
                    loadingArticles ? <div className="loader__container"><div class="loader"></div></div> : 
                    posts?.data.length ?
                    <div className="articles-component__grid">
                        {
                            posts?.data.map(d => {
                                return (
                                    <div className="articles-component__article" key={d.id} onClick={() => handleClick(d.id)}>
                                        <div className="articles-component__image">
                                            <img src={`https://letravelerguide.s3.eu-west-3.amazonaws.com/public/images/posts/${d.image}`} alt={d.title} />
                                        </div>
                                        <div className="articles-component__content">
                                            <h2>{d.title}</h2>
                                            <span>{moment(d.created_at).format("MMMM Do YYYY, h:mm:ss a")}</span>
                                            <p>{d.body.slice(0, 100)}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    : <p className="not-found">Not found!</p>
                }

            {
                posts?.data.length ?
                <Pagination
                    activePage={posts?.current_page ? posts?.current_page : 0}
                    itemsCountPerPage={posts?.per_page ? posts?.per_page : 0 }
                    totalItemsCount={posts?.total ? posts?.total : 0}
                    onChange={(pageNumber) => {
                        setLoadingArticles(true)
                        setPage(pageNumber)
                    }}
                    pageRangeDisplayed={8}
                    itemClass="page-item"
                />
                : ''
            }
        </section>
    )
}

export default ArticlesComponent;