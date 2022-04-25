import { useState, useEffect } from 'react';
import './dashboard-posts.styles.css';

import DashboardCreatePostComponent from '../dashboard-create-post';

import Cookies from 'js-cookie';
import axios from 'axios';

import moment from 'moment';
import Pagination from 'react-js-pagination';

const DashboardPostsComponent = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.post(`https://api-le-traveler-guide.herokuapp.com/api/posts/dashboard?page=${page}`, { headers: { 
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get('authToken')}`
        } })
        .then(res => {
            setPosts(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [loading])

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const handleRemove = id => {
        setLoading(true);
        axios.delete('https://api-le-traveler-guide.herokuapp.com/api/post/delete/' + id, { headers: { 
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get('authToken')}`
        } })
    }

    return (
        <div className="dashboard-posts">
            <button onClick={handleClick}>Create New Post</button>
            <DashboardCreatePostComponent isOpen={isOpen} setIsOpen={setIsOpen} handleClick={handleClick} setLoading={setLoading} />
            <table>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>ID</th>
                        <th>Title</th>
                        <th>Created At</th>
                        <th style={{textAlign: "center"}}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? <tr><td align="center" colSpan="4">Loading...</td></tr> : posts?.data.map(d => {
                            return (
                                <tr key={d.id}>
                                    <td style={{textAlign: "center"}}>{d.id}</td>
                                    <td>{d.title}</td>
                                    <td>{moment(d.created_at).format("MMMM Do YYYY, h:mm:ss a")}</td>
                                    <td style={{textAlign: "center"}}><i className="fa fa-trash" style={{ color: "#FF0000", cursor: "pointer" }} onClick={() => handleRemove(d.id)}></i></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {
                posts?.data.length ?
                <Pagination
                    activePage={posts?.current_page ? posts?.current_page : 0}
                    itemsCountPerPage={posts?.per_page ? posts?.per_page : 0 }
                    totalItemsCount={posts?.total ? posts?.total : 0}
                    onChange={(pageNumber) => {
                        setLoading(true)
                        setPage(pageNumber)
                    }}
                    pageRangeDisplayed={8}
                    itemClass="page-item"
                />
                : ''
            }
        </div>
    )
}

export default DashboardPostsComponent;