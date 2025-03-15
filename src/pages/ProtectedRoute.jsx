import { useSelector } from "react-redux";
import useRefreshToken from "../hooks/useRefreshToken";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { isRefreshing, refresh } = useRefreshToken();
  const [hasRefreshed, setHasRefreshed] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    console.log(isAuthenticated, hasRefreshed);
    if (!isAuthenticated && !hasRefreshed) {
      console.log(isAuthenticated, hasRefreshed);
      setHasRefreshed(true);
      refresh();
    }
  }, [isAuthenticated, refresh, hasRefreshed]);

  if (isRefreshing) {
    return (
      <div className="flex flex-col justify-center h-screen w-screen items-center gap-4">
        <Loading />
        <p className="text-sm font-semibold">Loading...</p>
      </div>
    );
  }

  return <div className="h-screen max-w-[90rem] mx-auto">{children}</div>;
}
