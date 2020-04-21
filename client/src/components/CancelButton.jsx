import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

class CancelButton extends Component {
  render() {
    return (
      <span style={{ position: "fixed", top: "280px", right: "40px" }}>
        <Icon
          style={{ boxShadow: "5px 5px 5px #888888", opacity: 0.9 }}
          link
          inverted
          circular
          name="undo"
          size="big"
        />
      </span>
    );
  }
}

export default CancelButton;
