import React from "react";
import "./_index.scss";
type Props = {
  src: string;
  className: string;
};

export const Card: React.FC<Props> = ({ src, className }) => {
  return (
    <div
      className={`box-photo-card ${className}`}
      style={{ backgroundImage: `url(${src})` }}></div>
  );
};
