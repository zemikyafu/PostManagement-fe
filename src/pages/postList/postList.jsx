import React, {useEffect, useState} from "react";
import Header from "../../components/shared/header";
import ManagePosts from "../../components/posts/manage-posts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../post/post.css";
import { PostsContext } from "../../context/posts.context";
import Notification from "../../components/shared/notification";
import Posts from "../../components/posts/posts";
import PostLists from "../../components/posts/postLists";

const PostList = () => {
    const API_URL = "http://localhost:8080/api/post";
    let config = {
        headers: {
            // "Access-Control-Allow-Origin": true,
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        }}

    useEffect(() => {
        getPosts()
    }, []);

    const getPosts = async () => {
        console.log("token "+localStorage.getItem("accessToken"))

        await axios
            .get(API_URL+`/getAllPost`,config)
            .then((res) => {
                setAllPosts(res.data );
                console.log("data "+JSON.stringify(res.data))
            })
            .catch((err) => console.log(err))
            ;
    };



    const [allPosts, setAllPosts] = useState([]);
    const user = JSON.parse(sessionStorage.user);

    return (
         <div className="wrapper">
                <Header />
                <div className="container">
                    {/*<Notification title={`Hello ${user.name} 🙂👋`} type="success" />*/}
                    <Notification title={`Hello ${user.name} `} type="success" />
                </div>
                <div className="container d-flex flex-lg-row flex-column gap-5">
                    <div className="flex-fill">
                        {/*<PostLists allPosts={allPosts} />*/}

                        <table>
                            <thead>
                            <tr>
                                <th>title</th>
                                <th>body</th>
                                <th>user ID</th>
                                <th>Read More</th>
                            </tr>
                            </thead>
                            <tbody>
                            { allPosts.map((allPost) =>
                                <tr key={allPost.id}>

                                    <td>{allPost.title}</td>
                                    <td>{allPost.body}</td>
                                    <td>{allPost.userId}</td>
                                    <td> <button variant="link">Edit</button></td>
                                </tr>

                            ) }
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>

    );
};

export default PostList;
