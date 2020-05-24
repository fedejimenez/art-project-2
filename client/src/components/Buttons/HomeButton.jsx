import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

class HomeButton extends Component {
  render() {
    return (
      <span
        style={{
          position: "fixed",
          bottom: "40px",
          right: "20px",
          zIndex: 3
        }}
      >
        <Icon
          style={{ boxShadow: "5px 5px 5px #888888", opacity: 0.9 }}
          link
          inverted
          circular
          name="home"
          size="big"
        />
      </span>
    );
  }
}

export default HomeButton;
