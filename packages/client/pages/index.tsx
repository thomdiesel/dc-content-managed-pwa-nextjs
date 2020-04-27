import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import Header from "../components/Header";
import PromoBanner from "../components/PromoBanner";
import UserActions from "../components/UserActions";
import Navigation from "../components/Navigation";
import SearchBox from "../components/SearchBox";
import Footer from "../components/Footer";
import EditorialBlock from "../components/EditorialBlock";
import HeroBannerBlock from "../components/HeroBannerBlock";
import GalleryBlock from "../components/GalleryBlock";
import Sidebar from "../components/Sidebar";
import { fetchContent } from "../utils/fetchContent";

interface Props {
  navigation: {
    links: { label: string; href: string }[];
  };
  promobanner: {
    description: string;
  };
  slot: {
    components: any[];
  };
}

const Index: NextPage<Props> = (props: Props) => {
  let { promobanner, navigation, slot } = props;

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const promoBanner = promobanner;
  const navigationLinks = navigation.links;

  return (
    <>
      <Head>
        <title>ANYA FINN</title>
      </Head>

      <div>
        <PromoBanner>{promoBanner.description}</PromoBanner>

        <Header
          actions={<UserActions />}
          search={<SearchBox />}
          navigation={<Navigation links={navigationLinks}></Navigation>}
          onToggleSidebar={handleToggleSidebar}
        ></Header>

        {slot.components.map((component) => {
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
          }

          return <ComponentType {...component} />;
        })}

        <Footer />
      </div>

      <Sidebar
        links={navigationLinks}
        open={sidebarOpen}
        onToggleOpen={handleToggleSidebar}
      />
    </>
  );
};

Index.getInitialProps = async (context) => {
  const promobanner = fetchContent("global/promobanner");
  const navigation = fetchContent("global/navigation");
  const slot = fetchContent("slots/homepage-hero");

  return {
    promobanner: await promobanner,
    navigation: await navigation,
    slot: await slot,
  };
};

export default Index;
