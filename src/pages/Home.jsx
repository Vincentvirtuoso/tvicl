import React from "react";
import Hero from "../section/home/Hero";
import ExclusiveProperties from "../section/home/ExclusiveProperties";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.activeRole === "agent") navigate("/agent/dashboard");
    else if (user?.activeRole === "estate") navigate("/estate/dashboard");
    else if (user?.activeRole === "admin") navigate("/admin/dashboard");
  }, [user, navigate]);

  return (
    <div>
      <Hero />
      <ExclusiveProperties />
    </div>
  );
};

export default Home;
