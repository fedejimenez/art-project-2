import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";
import CancelButton from "./Buttons/CancelButton";
import "../stylesheets/PostInfo.css";

class PostInfo extends Component {
  constructor() {
    super();
    this.state = { post: {} };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: "get",
      url: `/api/posts/${this.props.match.params.id}`,
      headers: { Authorization: token }
    })
      .then(response => {
        this.setState({
          post: response.data
        });
      })
      .catch(error => console.log("error", error));
  }

  handleDelete() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: "delete",
      url: `/api/posts/${this.props.match.params.id}`,
      headers: { Authorization: token }
    })
      .then(() => {
        this.props.history.push("/posts");
      })
      .catch(error => console.log("error", error));
  }

  render() {
    return (
      <div>
        <hr />
        <section className="PostInfo my-90">
          <header className="PostInfo-header text-center mb-40">
            <h3>{this.state.post.title}</h3>
          </header>
          <div className="PostInfo-content card-block">
            <p className="PostInfo-text text-center">
              {/* {this.state.post.content} */}
            </p>
          </div>
          <div className="PostInfo-image-container">
            <div className="PostInfo-image">
              <img src={this.state.post.src} alt="url" />
            </div>
            <div className="PostInfo-image-overlay">
              <div className="PostInfo-image-text">
                {this.state.post.content}
              </div>
            </div>
          </div>
        </section>
        <div className="PostInfo-buttons">
          <p>
            <Link to={`/posts/${this.state.post.id}/edit`}>
              <EditButton />
            </Link>
            <Link onClick={this.handleDelete} to="#">
              <DeleteButton />
            </Link>
            <Link to="/posts">
              <CancelButton />
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default PostInfo;
