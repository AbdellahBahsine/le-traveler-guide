import {useEffect, useState} from 'react';
import './articles.styles.css';

import { useNavigate } from "react-router-dom";

import DefaultHeaderComponent from '../../components/default-header';
import FooterComponent from '../../components/footer';

import Cookies from 'js-cookie';
import axios from 'axios';

import moment from 'moment';
import Pagination from 'react-js-pagination';

const ArticlesPage = () => {

    const [posts, setPosts] = useState(null);
    const [footerPosts, setFooterPosts] = useState(null);
    const [loadingArticles, setLoadingArticles] = useState(true);
    const [loadingFooter, setLoadingFooter] = useState(true);
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://api-le-traveler-guide.herokuapp.com/api/posts?page=${page}`, { headers: { 
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get('authToken')}`
        } })
        .then(res => {
            setPosts(res.data)
            setLoadingArticles(false)
        })
        .catch(err => console.log(err))
    }, [page])

    useEffect(() => {
        axios.get('https://api-le-traveler-guide.herokuapp.com/api/posts', { headers: { 
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get('authToken')}`
        } })
        .then(res => {
            setFooterPosts(res.data)
            setLoadingFooter(false)
        })
        .catch(err => console.log(err))
    }, [])

    const handleClick = id => {
        navigate('/article/' + id);
    }

    return (
        <div className="articles-page">
            {
                loadingFooter ? <div className="loader__container"><div className="loader"></div></div> :
                <>      
                    <DefaultHeaderComponent />
                    <main>
                        <section className="articles">
                                
                            <div className="articles-component__grid">
                                {
                                    loadingArticles ? <div className="loader__container"><div className="loader"></div></div> : posts?.data.map(d => {
                                        return (
                                            <div className="articles-page__article" key={d.id} onClick={() => handleClick(d.id)}>
                                                <div className="articles-page__image">
                                                    <img src={`https://letravelerguide.s3.eu-west-3.amazonaws.com/public/images/posts/${d.image}`} alt={d.title} />
                                                </div>
                                                <div className="articles-page__content">
                                                    <h2>{d.title}</h2>
                                                    <span>{moment(d.created_at).format("MMMM Do YYYY")}</span>
                                                    <p>{d.body.slice(0, 100)}</p>
                                                </div> 
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        

                        
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
                    </main>
            
                    <FooterComponent posts={footerPosts} />
            </>
            }
        </div>
    )
}

export default ArticlesPage;

