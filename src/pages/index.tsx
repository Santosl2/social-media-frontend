import type { NextPage } from "next";

import { Dashboard } from "@/components/templates";
import { LandingPage } from "@/components/templates/LandingPage";
import { useAuth } from "@/hooks/useAuth";

const Home: NextPage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && <Dashboard />}
      {!isAuthenticated && <LandingPage />}
    </>
  );
};

export default Home;
