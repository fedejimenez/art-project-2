import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../stylesheets/PhotoList.css";

class PostList extends Component {
  constructor() {
    super();
    this.state = { posts: [] };
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: "get",
      url: "/api/posts",
      headers: { Authorization: token }
    })
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => console.log("error", error));
  }

  render() {
    return (
      <div className="PhotoList-container">
        {this.state.posts.map(post => {
          return (
            <article className="PhotoList-item" key={post.id}>
              <header className="text-center mb-40">
                <h3>{post.title}</h3>
              </header>
              <Link to={`/posts/${post.id}`} className="">
                <img
                  className="rounded"
                  src="https://source.unsplash.com/qGQNmBE7mYw/800x599"
                  alt="..."
                />
              </Link>
              <div className="card-block">
                <p className="text-center">{post.content}</p>
                <p className="text-center mt-40">
                  <Link
                    to={`/posts/${post.id}`}
                    className="btn btn-primary btn-round"
                  >
                    Read more
                  </Link>
                </p>
              </div>
              <br />
              <hr />
            </article>
          );
        })}
        <Link to="/posts/new" className="btn btn-outline-primary">
          Create Post
        </Link>
      </div>
    );
  }
}

export default PostList;
