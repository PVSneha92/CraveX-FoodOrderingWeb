import { Outlet, useLocation } from "react-router-dom";
import { useEffect ,useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearUserdata, saveUserData } from "../redux/features/userSlice";

const AdminLayout = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const isAdminRoute = location.pathname.startsWith("/admin");
      const url = isAdminRoute ? "/check/admin" : "/check/restaurant";
      const response = await axiosInstance.get(url);
      dispatch(saveUserData(response?.data));
    } catch (error) {
      dispatch(clearUserdata());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};


export default AdminLayout;
