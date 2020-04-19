import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
        <h2>
          {this.state.post.id}: {this.state.post.title}
        </h2>
        <p>{this.state.post.content}</p>
        <p>
          <Link
            to={`/posts/${this.state.post.id}/edit`}
            className="btn btn-outline-dark"
          >
            Edit
          </Link>
          <button onClick={this.handleDelete} className="btn btn-outline-dark">
            Delete
          </button>
          <Link to="/posts" className="btn btn-outline-dark">
            Close
          </Link>
        </p>
        <hr />
      </div>
    );
  }
}

export default PostInfo;
