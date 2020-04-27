import React from "react";
import { NextPage } from "next";

import EditorialBlock from "../components/EditorialBlock";
import GlobalNavigation from "../components/Navigation";
import HeroBannerBlock from "../components/HeroBannerBlock";
import GalleryBlock from "../components/GalleryBlock";
import { fetchContentById } from "../utils/fetchContent";
import PromoBanner from "../components/PromoBanner";

interface Props {
  component: any;
}

const Visualization: NextPage<Props> = (props: Props) => {
  let { component } = props;

  let ComponentType = null;

  switch (component.component) {
    case "HeroBannerBlock":
      ComponentType = HeroBannerBlock;
      break;
    case "EditorialBlock":
      ComponentType = EditorialBlock;
      break;
    case "GalleryBlock":
      ComponentType = GalleryBlock;
      break;
    case "GlobalNavigation":
      ComponentType = GlobalNavigation;
      break;
    case "PromoBanner":
      ComponentType = PromoBanner;
      break;
  }

  return <ComponentType {...component} />;
};

Visualization.getInitialProps = async (context) => {
  const content = fetchContentById(
    context.query.id as string,
    context.query.contentApi as string
  );

  return {
    component: await content,
  };
};

export default Visualization;
