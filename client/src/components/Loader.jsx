import React from "react";
import ReactDOM from "react-dom";
import ContentLoader from "react-content-loader";

const Loader = props => {
  return (
    <ContentLoader speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
      <rect x="17%" y="20" rx="5" ry="5" width="16%" height="30" />

      {new Array(6).fill(" ").map((_, i) => {
        return (
          <rect x="5%" y={i * 50 + 70} rx="5" ry="5" width="40%" height="30" />
        );
      })}
      <rect x="55%" y="20" rx="5" ry="5" width="40%" height="80%" />
    </ContentLoader>
  );
};

export default Loader;
