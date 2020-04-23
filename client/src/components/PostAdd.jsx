import React, { Component } from "react";
import axios from "axios";

class PostAdd extends Component {
  constructor() {
    super();
    this.state = { title: "", content: "", src: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: "post",
      url: "/api/posts",
      headers: { Authorization: token },
      data: this.state
    })
      .then(response => {
        this.props.history.push(`/posts/${response.data.id}`);
      })
      .catch(error => console.log("error", error));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCancel() {
    this.props.history.push("/posts");
  }

  uploadWidget(event) {
    let callback = result => {
      this.setState({ src: result.info.url });
    };
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        folder: process.env.REACT_APP_CLOUDINARY_FOLDER,
        cropping: "true",
        croppingValidateDimensions: "true",
        showCompletedButton: "true",
        minImageHeight: 400,
        minImageWidth: 400,
        maxImageHeight: 1500,
        maxImageWidth: 1500,
        maxFileSize: 10000000,
        croppingShowDimensions: "true",
        tags: []
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          callback(result);
        }
      }
    );
  }

  render() {
    return (
      <div>
        <h1>Create Post</h1>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="font-weight-bold">Title</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label className="font-weight-bold">Content</label>
            <textarea
              name="content"
              rows="5"
              value={this.state.content || ""}
              onChange={this.handleChange}
              className="form-control"
              required
            />
          </div>

          <label className="font-weight-bold">Image</label>
          <div className="upload">
            <button
              className="btn btn--secondary-outline"
              type="button"
              onClick={this.uploadWidget}
            >
              Add Image
            </button>
          </div>
          <br></br>
          <div className="form-group">
            <textarea
              name="src"
              rows="1"
              value={this.state.src}
              onChange={this.handleChange}
              className="form-control"
              disabled
            />
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="btn-group">
            <button
              type="submit"
              className="btn btn-dark m-sm-1"
              onSubmit={this.handleSubmit}
            >
              Create
            </button>
            <button
              type="button"
              onClick={this.handleCancel}
              className="btn btn-secondary m-sm-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PostAdd;
