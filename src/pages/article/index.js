import {useEffect, useState} from 'react';
import './article.styles.css';

import { useParams } from 'react-router-dom';

import DefaultHeaderComponent from '../../components/default-header';
import FooterComponent from '../../components/footer';

import axios from 'axios';
import Cookies from 'js-cookie';

import {DiscussionEmbed} from "disqus-react"

const ArticlePage = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [footerPosts, setFooterPosts] = useState(null);
    const [loadingFooter, setLoadingFooter] = useState(true);

    let { id } = useParams();

    const disqusShortname = "le-traveler-guide-herokuapp-com"
    const disqusConfig = {
        url: "http://localhost:3000/article",
        identifier: data?.post.id + "",
        title: data?.post.title + ""
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/post/' + id)
        .then(res => {
            setData(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        axios.get('http://localhost:8000/api/posts', { headers: { 
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
        <div className="article-page">
            {
                loadingFooter ? <div className="loader__container"><div className="loader"></div></div> :
                <>
                <DefaultHeaderComponent id={id} />
                    <main>
                        <section className="article">
                            <div className="article-page__image">
                                <img src={`https://letravelerguide.s3.eu-west-3.amazonaws.com/public/images/posts/${data?.post.image}`} alt={data?.post.title} />
                            </div>
                            <div className="article-page__text">
                                <h2 className="article-page__title">{data?.post.title}</h2>
                                <p className="article-page__subtitle">{data?.post.created_at}, {data?.user.name}</p>
        
                                <p className="article-page__body">{data?.post.body}</p>
                            </div>

                            <DiscussionEmbed
                                shortname={disqusShortname}
                                config={disqusConfig}
                            />
                        </section>
                    </main>
                <FooterComponent posts={footerPosts} />
                </>
            }
        </div>
    )
}

export default ArticlePage;