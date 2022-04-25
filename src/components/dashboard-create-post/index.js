import {useState} from 'react';
import './dashboard-create-post.styles.css';

import Cookies from 'js-cookie';
import axios from 'axios';

const DashboardCreatePostComponent = ({isOpen, setIsOpen, handleClick, setLoading}) => {

    const [data, setData] = useState({title: '', body: '', image: null})
    const [isFetching, setFetching] = useState(false);

    const {title, body, image} = data

    const handleSubmit = e => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('title', title)
        fd.append('body', body)
        fd.append('image', image)

        setFetching(true)

        axios.post('http://localhost:8000/api/posts/create', fd, { headers: { 
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get('authToken')}`,
        } })
        .then(res => {
            setIsOpen(false)
            setData({title: '', body: '', image: null})
            setLoading(true)
            setFetching(false)
        })
        .catch(err => {
            console.log(err.response)
            setFetching(false)
        })
    }

    return (
        <div className={isOpen ? "dashboard-create-post open" : "dashboard-create-post"}>
            <div className="dashboard-create-post__inner">
                {
                    isFetching ? <div className="fetching"><div className="loader__container"><div class="loader"></div></div></div> : '' 
                }
                <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <span onClick={handleClick}>X</span>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={title} onChange={e => setData({...data, title: e.target.value})} />

                    <label htmlFor="body">Body</label>
                    <textarea name="body" cols="30" rows="10" value={body} onChange={e => setData({...data, body: e.target.value})}></textarea>

                    <input type="file" accept="image/*" onChange={e => setData({...data, image: e.target.files[0]})} />

                    <button>Create Article</button>
                </form>
            </div>
        </div>
    )
}

export default DashboardCreatePostComponent;