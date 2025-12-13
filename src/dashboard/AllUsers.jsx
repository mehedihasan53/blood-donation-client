import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";
import {
  FaUser,
  FaBan,
  FaCheck,
  FaUserShield,
  FaUserFriends,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Loading from "../components/shared/Loading";

// Badge helper
const getBadge = (type, value) => {
  const colors = {
    role: {
      admin: "bg-purple-100 text-purple-800",
      volunteer: "bg-blue-100 text-blue-800",
      donor: "bg-green-100 text-green-800",
    },
    status: {
      active: "bg-green-100 text-green-800",
      blocked: "bg-red-100 text-red-800",
    },
  };
  return colors[type][value] || "";
};

// User Actions component
const UserActions = ({ user, onStatus, onRole }) => (
  <div className="flex gap-2">
    {/* Status toggle button */}
    <button
      onClick={() => onStatus(user.email, user.status)}
      className={`px-3 py-1 rounded text-sm ${
        user.status === "active"
          ? "bg-red-100 text-red-700 hover:bg-red-200"
          : "bg-green-100 text-green-700 hover:bg-green-200"
      }`}
    >
      {user.status === "active" ? <FaBan /> : <FaCheck />}
    </button>

    {/* Role buttons */}
    {user.role !== "volunteer" && user.role !== "admin" && (
      <button
        onClick={() => onRole(user.email, "volunteer")}
        className="px-3 py-1 rounded text-sm bg-blue-100 text-blue-700 hover:bg-blue-200"
      >
        <FaUserFriends />
      </button>
    )}

    {user.role !== "admin" && (
      <button
        onClick={() => onRole(user.email, "admin")}
        className="px-3 py-1 rounded text-sm bg-purple-100 text-purple-700 hover:bg-purple-200"
      >
        <FaUserShield />
      </button>
    )}
  </div>
);

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Fetch all users
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    axiosSecure
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, [axiosSecure, user]);

  // Toggle user status
  const handleStatus = async (email, current) => {
    const newStatus = current === "active" ? "blocked" : "active";
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

  // Update user role
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

  if (loading)
    return (
      <div className="text-center py-12">
        <Loading />
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold">
            {users.filter((u) => u.status === "active").length}
          </div>
          <div className="text-sm">Active Users</div>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold">
            {users.filter((u) => u.status === "blocked").length}
          </div>
          <div className="text-sm">Blocked Users</div>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold">
            {users.filter((u) => u.role === "admin").length}
          </div>
          <div className="text-sm">Admin Users</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {["all", "active", "blocked"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded ${
              filter === f ? "bg-red-600 text-white" : "bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.email} className="border-b hover:bg-gray-50">
                  <td className="p-3 flex items-center gap-3">
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <FaUser />
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-sm text-gray-600">{u.email}</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getBadge(
                        "role",
                        u.role
                      )}`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getBadge(
                        "status",
                        u.status
                      )}`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <UserActions
                      user={u}
                      onStatus={handleStatus}
                      onRole={handleRole}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
