import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

class QuillEditor extends Component {
  constructor(props) {
    super(props);

    this.modules = {
      toolbar: [
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["clean"]
      ]
    };

    this.formats = [
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "list",
      "bullet",
      "align",
      "color",
      "background"
    ];

    this.rteChange = this.rteChange.bind(this);
  }

  rteChange = (content, delta, source, editor) => {
    this.props.onChange(editor.getHTML());
  };

  render() {
    return (
      <div>
        <ReactQuill
          theme="snow"
          modules={this.modules}
          formats={this.formats}
          onChange={this.rteChange}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default QuillEditor;
