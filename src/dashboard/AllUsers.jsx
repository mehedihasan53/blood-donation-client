import { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    axiosSecure
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, [axiosSecure, user]);

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
            className={`bg-${stat.color}-100 p-4 rounded-lg`}
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">
                    User
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">
                    Role
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((u) => (
                  <tr key={u.email} className="hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {u.avatar ? (
                            <img
                              src={u.avatar}
                              alt={u.name}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <FaUser className="text-gray-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">
                            {u.name}
                          </div>
                          <div className="text-sm text-gray-500">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm capitalize ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : u.role === "volunteer"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm capitalize ${
                          u.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === u.email ? null : u.email
                            )
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
                              {u.status === "active"
                                ? "Block User"
                                : "Unblock User"}
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
