// Customer.js
import React from 'react'

// deconstructed props
function PostList({post:{id, title, body, userId} }) {

    return (
        <tr key={id}>

            <td>{title}</td>
            <td>{body}</td>
            <td>{userId}</td>
            <td><button>Edit</button></td>
        </tr>
    )
}
export default PostList