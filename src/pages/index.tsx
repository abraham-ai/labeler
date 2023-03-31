import React from 'react';
import MainPageContent from "components/MainPageContent";
import type { NextPage } from "next";
import Head from "next/head";
import "antd/dist/reset.css";

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>Labeler</title>
        <meta name="description" content="labeler" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainPageContent />
    </div>
  );
};

export default Home;
