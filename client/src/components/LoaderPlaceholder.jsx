import React from "react";
import ContentLoader from "react-content-loader";

const LoaderPlaceholder = ({ c }) => (
  <ContentLoader
    height={400}
    width={1000}
    speed={1}
    backgroundColor={"#aaa"}
    foregroundColor={"#ddd"}
    viewBox="0 0 450 200"
  >
    {/* Only SVG shapes */}
    <rect x="80" y="0" rx="5" ry="5" width="150" height="200" />
    <rect x="300" y="17" rx="4" ry="4" width="100" height="10" />
    <rect x="250" y="40" rx="3" ry="3" width="200" height="20" />
    <rect x="250" y="70" rx="2" ry="2" width="200" height="20" />
    <rect x="250" y="100" rx="1" ry="1" width="200" height="20" />
  </ContentLoader>
);

export default LoaderPlaceholder;
