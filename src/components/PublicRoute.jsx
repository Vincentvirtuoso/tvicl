import FullScreenLoader from "./common/FullScreenLoader";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading.getCurrentUser) return <FullScreenLoader />;

  if (user && user.verified) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return children;
};


export default PublicRoute