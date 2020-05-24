import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateButton from "./Buttons/CreateButton";
import HomeButton from "./Buttons/HomeButton";
import ReactHtmlParser from "react-html-parser";
import "../stylesheets/PostList.css";
import LazyLoad from "react-lazyload";

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
        {this.state.posts.sort().map((post, index) => {
          return (
            <LazyLoad height={200}>
              <div key={post.id}>
                <section
                  className="PhotoList-item"
                  style={{
                    flexDirection: index % 2 !== 0 ? "row-reverse" : "row"
                  }}
                >
                  <div className="PhotoList-content">
                    <header className="text-center mb-40">
                      <h3>{post.title}</h3>
                    </header>
                    <div className="card-block">
                      <div className="PhotoList-text">
                        <div className="text-center">
                          {" "}
                          {ReactHtmlParser(post.content)}{" "}
                        </div>
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
                  <div
                    className="PhotoList-frame"
                    style={{ backgroundImage: `url(${post.src})` }}
                  >
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
            </LazyLoad>
          );
        })}
        <Link to={`/posts/new`}>
          <CreateButton />
        </Link>
        <Link to={`/`}>
          <HomeButton />
        </Link>
      </div>
    );
  }
}

export default PostList;
