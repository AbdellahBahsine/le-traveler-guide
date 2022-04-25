import {useEffect, useState} from 'react';
import './home.styles.css';

import HomeHeaderComponent from '../../components/home-header';
import HeroComponent from '../../components/hero';
import ArticlesComponent from '../../components/articles';
import SidebarComponent from '../../components/sidebar';
import FooterComponent from '../../components/footer';

import axios from 'axios';
import Cookies from 'js-cookie';

const HomePage = () => {

    const [posts, setPosts] = useState(null);
    const [footerPosts, setFooterPosts] = useState(null);
    const [loadingArticles, setLoadingArticles] = useState(true);
    const [loadingFooter, setLoadingFooter] = useState(true);
    const [page, setPage] = useState(1);
    const [input, setInput] = useState('');

    useEffect(() => {
        axios.post(`https://api-le-traveler-guide.herokuapp.com/api/posts/home?page=${page}`, {search: input}, { headers: {  
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get('authToken')}`
        } })
        .then(res => {
            setPosts(res.data)
            setLoadingArticles(false)
        })
        .catch(err => console.log(err))
    }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

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

    return(
        <div className="home-page">
            {
                loadingFooter ? <div className="loader__container"><div className="loader"></div></div> :
                <>
                    <HomeHeaderComponent />
                    <HeroComponent />
                    <main>                
                        <ArticlesComponent posts={posts} loadingArticles={loadingArticles} setLoadingArticles={setLoadingArticles} page={page} setPage={setPage} />
                        <SidebarComponent setPosts={setPosts} input={input} setInput={setInput} page={page} setLoadingArticles={setLoadingArticles} />
                    </main>
                    <FooterComponent posts={footerPosts} />
                </>
            }
        </div>
    )
}

export default HomePage;