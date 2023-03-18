import PostList from "./postList";
import React from 'react'
const PostLists = ({ PostLists }) => {

    return (
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
            { PostList?.map((PostLists) =>
                 <PostList key={PostLists.id} post={PostLists} />

            ) }
            </tbody>
        </table>
    )
}
export default PostLists;