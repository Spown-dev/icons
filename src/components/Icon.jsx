import React from "react";
import { ReactSVG } from "react-svg";
import * as Icons from "../svg";

const SvgIcon = ({ name, ...props }) => {
  const SvgComponent = Icons[name];

  if (!SvgComponent) {
    return <span>SVG not found</span>;
  }

  return <ReactSVG src={SvgComponent} {...props} />;
};

export default SvgIcon;
