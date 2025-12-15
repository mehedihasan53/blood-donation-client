import { useContext, useEffect, useState, useRef } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";
import {
  FaUser,
  FaBan,
  FaCheck,
  FaUserShield,
  FaUserFriends,
  FaEllipsisV,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Loading from "../components/shared/Loading";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    axiosSecure
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, [axiosSecure, user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatus = async (email, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    try {
      await axiosSecure.patch(
        `/update/user/status?email=${email}&status=${newStatus}`
      );
      setUsers(
        users.map((u) => (u.email === email ? { ...u, status: newStatus } : u))
      );
      toast.success(`User ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleRole = async (email, role) => {
    try {
      await axiosSecure.patch(`/update/user/role?email=${email}&role=${role}`);
      setUsers(users.map((u) => (u.email === email ? { ...u, role } : u)));
      toast.success(`Role updated to ${role}`);
    } catch {
      toast.error("Failed to update role");
    }
  };

  const filteredUsers =
    filter === "all" ? users : users.filter((u) => u.status === filter);

  const stats = {
    active: users.filter((u) => u.status === "active").length,
    blocked: users.filter((u) => u.status === "blocked").length,
    admin: users.filter((u) => u.role === "admin").length,
  };

  if (loading)
    return (
      <div className="text-center py-12">
        <Loading />
      </div>
    );

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Active Users", value: stats.active, color: "green" },
          { label: "Blocked Users", value: stats.blocked, color: "red" },
          { label: "Admin Users", value: stats.admin, color: "purple" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-${stat.color}-100 p-4 rounded-lg flex flex-col items-center`}
          >
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "active", "blocked"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg capitalize ${
              filter === f
                ? "bg-red-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredUsers.length === 0 ? (
        <div className="p-8 text-center text-gray-500">No users found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredUsers.map((u, index) => (
            <div
              key={u.email}
              className="bg-white rounded-2xl shadow-lg border-l-6 border-red-500 overflow-hidden hover:shadow-xl transition-all flex flex-col md:flex-row relative"
            >
              <div className="flex-1 p-5 md:p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <FaUser className="text-gray-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">
                      {u.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{u.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {/* Role */}
                  <span
                    className={`px-2 py-1 rounded-full text-xs capitalize ${
                      u.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : u.role === "volunteer"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {u.role}
                  </span>

                  <span
                    className={`px-2 py-1 rounded-full text-xs capitalize ${
                      u.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {u.status}
                  </span>
                </div>
              </div>

              <div className="absolute top-3 right-3" ref={dropdownRef}>
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === u.email ? null : u.email)
                  }
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaEllipsisV />
                </button>
                {openDropdown === u.email && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        handleStatus(u.email, u.status);
                        setOpenDropdown(null);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {u.status === "active" ? <FaBan /> : <FaCheck />}
                      {u.status === "active" ? "Block User" : "Unblock User"}
                    </button>
                    {u.role !== "volunteer" && u.role !== "admin" && (
                      <button
                        onClick={() => {
                          handleRole(u.email, "volunteer");
                          setOpenDropdown(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        <FaUserFriends />
                        Make Volunteer
                      </button>
                    )}
                    {u.role !== "admin" && (
                      <button
                        onClick={() => {
                          handleRole(u.email, "admin");
                          setOpenDropdown(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        <FaUserShield />
                        Make Admin
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
