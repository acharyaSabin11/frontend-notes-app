import { useDispatch, useSelector } from "react-redux";
import useRefreshToken from "../hooks/useRefreshToken";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetExpiry } from "../store/authSlice";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const expired = useSelector((state) => state.auth.expired);
  const navigate = useNavigate();
  const { isRefreshing, refresh } = useRefreshToken();
  const [hasRefreshed, setHasRefreshed] = useState(false);

  useEffect(() => {
    if (expired == true) {
      toast.error("Session Expired. Please login again");
      navigate("/login");
      dispatch(resetExpiry());
    }
  }, [expired, navigate, dispatch]);

  useEffect(() => {
    if (!isAuthenticated && !hasRefreshed) {
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

  if (!isAuthenticated && hasRefreshed) {
    return <div>Not authenticated</div>;
  }

  return <div className="h-screen max-w-[90rem] mx-auto">{children}</div>;
}
