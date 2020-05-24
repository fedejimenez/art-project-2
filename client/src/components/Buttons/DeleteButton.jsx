import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

class DeleteButton extends Component {
  render() {
    return (
      <span
        style={{
          position: "fixed",
          bottom: "220px",
          right: "20px",
          zIndex: 3
        }}
      >
        <Icon
          style={{ boxShadow: "5px 5px 5px #888888", opacity: 0.9 }}
          link
          inverted
          circular
          name="trash"
          size="big"
          color="red"
        />
      </span>
    );
  }
}

export default DeleteButton;
