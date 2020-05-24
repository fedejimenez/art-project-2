import React from "react";
import ContentLoader from "react-content-loader";

const Loader = props => {
  return (
    <ContentLoader speed={2} primary="#f3f3f3" secondary="#ecebeb">
      <rect
        x="17%"
        y="20"
        rx="5"
        ry="5"
        width="16%"
        height="30"
        className="Loader-title"
      />

      {new Array(6).fill(" ").map((_, i) => {
        return (
          <rect
            x="5%"
            y={i * 50 + 70}
            rx="5"
            ry="5"
            width="40%"
            height="30"
            key={i}
            className="Loader-text"
          />
        );
      })}
      <rect
        x="55%"
        y="20"
        rx="5"
        ry="5"
        width="40%"
        height="80%"
        className="Loader-image"
      />
    </ContentLoader>
  );
};

export default Loader;
