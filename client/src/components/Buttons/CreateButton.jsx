import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

class CreateButton extends Component {
  render() {
    return (
      <span style={{ position: "fixed", bottom: "120px", right: "20px" }}>
        <Icon
          style={{ boxShadow: "5px 5px 5px #888888", opacity: 0.9 }}
          link
          inverted
          circular
          name="add"
          size="big"
        />
      </span>
    );
  }
}

export default CreateButton;
