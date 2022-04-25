import './sidebar.styles.css';

import axios from 'axios';
import Cookies from 'js-cookie';

const SidebarComponent = ({setPosts, input, setInput, page, setLoadingArticles}) => {

    const handleClick = () => {
        setLoadingArticles(true)
        axios.post(`https://api-le-traveler-guide.herokuapp.com/api/posts/home?page=${page}`, {search: input}, { headers: { 
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get('authToken')}`
        } })
        .then(res => {
            setPosts(res.data)
            setLoadingArticles(false)
        })
        .catch(err => setLoadingArticles(false))
    }
    
    return (
        <section className="sidebar-component">
            <div className="search">
                <input type="text" placeholder='Search post...' value={input} onChange={e => setInput(e.target.value)} />
                <button onClick={handleClick}>Search</button>
            </div>

            <div className="line"></div>

            <div className="about">
                <h2>About</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium eos provident magnam illo obcaecati itaque harum, ipsa asperiores voluptate qui vitae quae aut, deleniti quidem assumenda alias molestias odit totam voluptate qui.</p>
            </div>
        </section>
    )
}

export default SidebarComponent;