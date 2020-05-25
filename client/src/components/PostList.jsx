import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateButton from "./Buttons/CreateButton";
import HomeButton from "./Buttons/HomeButton";
import ReactHtmlParser from "react-html-parser";
import "../stylesheets/PostList.css";
import LazyLoad from "react-lazyload";
import Loader from "./Loader";
import { Pagination } from "semantic-ui-react";

class PostList extends Component {
  constructor() {
    super();
    this.state = {
      postsData: {
        posts: [],
        page: "1",
        pages: "1"
      },
      loading: true
    };
    this.handlePage = this.handlePage.bind(this);
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: "get",
      url: "/api/posts",
      headers: { Authorization: token }
    })
      .then(response => {
        this.initialState(response.data);
      })
      .catch(error => console.log("error", error));
  }

  initialState = data => {
    this.setState({
      loading: false,
      postsData: {
        posts: data.posts,
        page: data.page,
        pages: data.pages
      }
    });
  };

  handlePage = (e, { activePage }) => {
    let goToPage = { activePage };
    let pageNum = goToPage.activePage;
    let pageString = pageNum.toString();
    this.setState({
      loading: true
    });
    let token = "Bearer " + localStorage.getItem("jwt");
    const url = "/api/posts/?page=" + pageString;

    axios({
      method: "get",
      url: url,
      headers: { Authorization: token }
    })
      .then(response => {
        this.initialState(response.data);
      })
      .catch(error => console.log("error", error));
  };

  render() {
    return (
      <div className="PostList-container">
        <hr />
        <div className="PostList-loader">
          {this.state.loading ? <Loader /> : ""}
        </div>
        {this.state.postsData.posts.sort().map((post, index) => {
          return (
            <LazyLoad height={200} key={post.id}>
              <div key={post.id}>
                <section
                  className="PostList-item"
                  style={{
                    flexDirection: index % 2 !== 0 ? "row-reverse" : "row"
                  }}
                >
                  <div className="PostList-content">
                    <header className="text-center mb-40">
                      <h3>{post.title}</h3>
                    </header>
                    <div className="card-block">
                      <div className="PostList-text">
                        <div className="text-center">
                          {" "}
                          {ReactHtmlParser(post.content)}{" "}
                        </div>
                      </div>
                      <p className="text-center mt-40">
                        <Link
                          to={`/posts/${post.id}`}
                          className="PostList-read-more btn btn-primary btn-round"
                        >
                          Read more
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div
                    className="PostList-frame"
                    style={{ backgroundImage: `url(${post.src})` }}
                  >
                    {/* <Link to={`/posts/${post.id}`} className=""> */}
                    <div className="PostList-image">
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
        <div className="PostList-pagination">
          <Pagination
            onPageChange={this.handlePage}
            siblingRange="1"
            defaultActivePage={this.state.postsData.page}
            totalPages={this.state.postsData.pages}
          />
        </div>
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
