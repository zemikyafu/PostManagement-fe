import React, { useState } from "react";
import Header from "../../components/shared/header";
import ManagePosts from "../../components/posts/manage-posts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./post.css";
import { PostsContext } from "../../context/posts.context";
import Notification from "../../components/shared/notification";
import Posts from "../../components/posts/posts";

const Post = () => {
    const API_URL = "http://localhost:8080/api/post";
    let config = {
        headers: {
            // "Access-Control-Allow-Origin": true,
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        }}


    const getPosts = async () => {
        console.log("token "+localStorage.getItem("accessToken"))

        setPostState((prevState) => ({ ...prevState, loading: true }));
        await axios
            .get(API_URL+`/findPostByUserId/${user.id}`,config)
            .then((res) => {
                setPostState((prevState) => ({ ...prevState, posts: res.data }));
            })
            .catch((err) => console.log(err))
            .finally(() =>
                setPostState((prevState) => ({ ...prevState, loading: false }))
            );
    };

    const submitPost = async (values) => {
        setPostState((prevState) => ({ ...prevState, saving: true }));

        //  const data = { ...values, userId: user.id };
        let data ={ "title": values.title, "body":values.body };

        await axios
            .post(API_URL+ "/createPost", data, config)
            .then((res) => {
                if (res.status === 201) {
                    getPosts();
                }
            })
            .catch((err) => console.log(err))
            .finally(() =>
                setPostState((prevState) => ({ ...prevState, saving: false }))
            );
    };

    const deletePost = async (id) => {
        // console.log("id "+id);
        // console.log("config "+ JSON.stringify(config))
        await axios
            .delete( API_URL+`/deletePost/${id}`,config)
            .then((res) => {
                if (res.status === 200) {
                    getPosts();

                }
            })
            .catch((err) => console.log(err))
            .finally(() =>
                setPostState((prevState) => ({ ...prevState, saving: false }))
            );
    };

    const editPost = async (values) => {
        const { id } = values;

        let data ={ "title": values.title, "body":values.body};

        await axios
            .put(API_URL+`/updatePost/${id}`, data, config)
            .then((res) => {
                if (res.status === 200) {
                    getPosts();
                    setEditMode({ status: false, data: null });
                }
            })
            .catch((err) => console.log(err))
            .finally(() =>
                setPostState((prevState) => ({ ...prevState, saving: false }))
            );
    };

    const searchPost = async (param) => {
        // await axios
        //   .get(
        //     `http://localhost:3001/posts?userId=${user.id}&name_like=${param}`
        //   )
        //   .then((res) => {
        //     setPostState((prevState) => ({ ...prevState, posts: res.data }));
        //   })
        //   .catch((err) => console.log(err))
        //   .finally(() =>
        //     setPostState((prevState) => ({ ...prevState, loading: false }))
        //   );
    };

    const setEditMode = (mode) =>
        setPostState((prevState) => ({ ...prevState, editMode: mode }));



    const [postState, setPostState] = useState({
        loading: false,
        saving: false,
        editMode: { status: false, data: null },
        posts: [],
        getPosts,
        submitPost,
        deletePost,
        editPost,
        searchPost,
        setEditMode,
     //   logout,

    });
    // const logout = () => {
    //     sessionStorage.removeItem("isAuthenticated");
    //     sessionStorage.removeItem("user");
    //     navigate("/login");
    // };

    const navigate = useNavigate();

    const user = JSON.parse(sessionStorage.user);

    return (
        <PostsContext.Provider value={postState}>
            <div className="wrapper">
                <Header />
                <div className="container">
                    {/*<Notification title={`Hello ${user.name} 🙂👋`} type="success" />*/}
                    <Notification title={`Hello ${user.name} `} type="success" />
                </div>
                <div className="container d-flex flex-lg-row flex-column gap-5">
                    <div className="flex-fill">
                        <ManagePosts />
                    </div>
                    <div className="flex-fill">
                        <Posts />
                    </div>
                </div>
            </div>
        </PostsContext.Provider>
    );
};

export default Post;
