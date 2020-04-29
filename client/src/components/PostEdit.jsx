import React from "react";
import axios from "axios";
import QuillEditor from "./QuillEditor";
import "../stylesheets/PostEdit.css";

class PostEdit extends React.Component {
  constructor() {
    super();
    this.state = { title: "", content: "", src: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: "get",
      url: `/api/posts/${this.props.match.params.id}`,
      headers: { Authorization: token }
    })
      .then(response => {
        this.setState(response.data);
      })
      .catch(error => console.log("error", error));
  }

  handleSubmit(event) {
    event.preventDefault();
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: "patch",
      url: `/api/posts/${this.state.id}`,
      headers: { Authorization: token },
      data: this.state
    })
      .then(() => {
        this.props.history.push(`/posts/${this.state.id}`);
      })
      .catch(error => console.log("error", error));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleContentChange = content => {
    this.setState({ content: content });
  };

  handleCancel() {
    this.props.history.push(`/posts/${this.state.id}`);
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
        <h1>Edit {this.state.title}</h1>
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
            <QuillEditor
              name="content"
              rows="7"
              value={this.state.content}
              onChange={this.handleContentChange}
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
          <div className="form-group">
            <textarea
              name="src"
              rows="1"
              value={this.state.src}
              onChange={this.handleChange}
              className="form-control"
              disabled
              required
            />
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="PostEdit-buttons btn-group">
            <br></br>
            <button type="submit" className="btn btn-dark m-sm-1">
              Update
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

export default PostEdit;
