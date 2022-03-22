import type { NextPage } from "next";
import Head from "next/head";

import { Dashboard } from "@/components/templates";
import { LandingPage } from "@/components/templates/LandingPage";
import { useAuth } from "@/hooks/useAuth";

const Home: NextPage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Head>
        <title>Social Media</title>
      </Head>
      {isAuthenticated && <Dashboard />}
      {!isAuthenticated && <LandingPage />}
    </>
  );
};

export default Home;
