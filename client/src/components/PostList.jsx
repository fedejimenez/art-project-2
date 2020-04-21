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
        <hr />
        {this.state.posts.map(post => {
          return (
            <div key={post.id}>
              <section className="PhotoList-item">
                <div className="PhotoList-content">
                  <header className="text-center mb-40">
                    <h3>{post.title}</h3>
                  </header>
                  <div className="card-block">
                    <div className="PhotoList-text">
                      <p className="text-center">{post.content}</p>
                    </div>
                    <p className="text-center mt-40">
                      <Link
                        to={`/posts/${post.id}`}
                        className="PhotoList-read-more btn btn-primary btn-round"
                      >
                        Read more
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="PhotoList-frame">
                  {/* <Link to={`/posts/${post.id}`} className=""> */}
                  <div className="PhotoList-image">
                    {/* <img */}
                    {/* className="" */}
                    {/* // src="https://source.unsplash.com/qGQNmBE7mYw/400x599" */}
                    {/* alt="..." */}
                    {/* /> */}
                  </div>
                  {/* </Link> */}
                </div>
              </section>
              <hr />
            </div>
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
