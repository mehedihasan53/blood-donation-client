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
import DynamicTitle from "../components/shared/DynamicTitle";
import OverviewCard from "../components/dashboard/OverviewCard";
import DataTable from "../components/dashboard/DataTable";
import { motion } from "framer-motion";

const getRoleBadgeClass = (role) => {
  const classes = {
    admin: "bg-gradient-to-r from-purple-500/10 to-purple-600/10 text-purple-600 border-0",
    volunteer: "bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-600 border-0",
    donor: "bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-600 border-0"
  };
  return classes[role] || classes.donor;
};

const getStatusBadgeClass = (status) => {
  const classes = {
    active: "bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-600 border-0",
    blocked: "bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-600 border-0"
  };
  return classes[status] || classes.active;
};

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside any dropdown
      const isClickInsideDropdown = event.target.closest('[id^="dropdown-"]') ||
        event.target.closest('button[aria-label="User actions"]');

      if (!isClickInsideDropdown) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data || []);
      } catch (err) {
        console.error("Failed to load users:", err);
        setError("Failed to load users. Please try again.");
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [axiosSecure, user]);

  const handleStatus = async (email, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";

    try {
      await axiosSecure.patch(
        `/update/user/status?email=${email}&status=${newStatus}`
      );

      setUsers(prevUsers =>
        prevUsers.map((u) => (u.email === email ? { ...u, status: newStatus } : u))
      );

      toast.success(`User ${newStatus} successfully`);
    } catch (err) {
      console.error("Failed to update user status:", err);
      toast.error("Failed to update user status. Please try again.");
    }
  };

  const handleRole = async (email, role) => {
    try {
      await axiosSecure.patch(`/update/user/role?email=${email}&role=${role}`);

      setUsers(prevUsers =>
        prevUsers.map((u) => (u.email === email ? { ...u, role } : u))
      );

      toast.success(`Role updated to ${role} successfully`);
    } catch (err) {
      console.error("Failed to update user role:", err);
      toast.error("Failed to update user role. Please try again.");
    }
  };

  const stats = {
    active: users.filter((u) => u.status === "active").length,
    blocked: users.filter((u) => u.status === "blocked").length,
    admin: users.filter((u) => u.role === "admin").length,
    volunteer: users.filter((u) => u.role === "volunteer").length,
  };

  const renderActions = (u) => {
    const dropdownId = `dropdown-${u.email}`;

    return (
      <div className="relative">
        <button
          onClick={() =>
            setOpenDropdown(openDropdown === u.email ? null : u.email)
          }
          className="p-2 rounded-lg hover:bg-theme-tertiary/50 transition-colors duration-200"
          aria-label="User actions"
        >
          <FaEllipsisV className="text-theme-muted" />
        </button>
        {openDropdown === u.email && (
          <div
            id={dropdownId}
            className="absolute right-0 mt-2 w-44 bg-theme-card/95 backdrop-blur-xl border-0 rounded-xl shadow-modern-2xl z-50 overflow-hidden"
          >
            <button
              onClick={() => {
                handleStatus(u.email, u.status);
                setOpenDropdown(null);
              }}
              className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-theme-tertiary/50 text-left transition-colors duration-200 text-theme-primary"
            >
              {u.status === "active" ? <FaBan className="text-red-500" /> : <FaCheck className="text-green-500" />}
              {u.status === "active" ? "Block User" : "Unblock User"}
            </button>

            {u.role !== "volunteer" && u.role !== "admin" && (
              <button
                onClick={() => {
                  handleRole(u.email, "volunteer");
                  setOpenDropdown(null);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-theme-tertiary/50 text-left transition-colors duration-200 text-theme-primary"
              >
                <FaUserFriends className="text-blue-500" />
                Make Volunteer
              </button>
            )}

            {u.role !== "admin" && (
              <button
                onClick={() => {
                  handleRole(u.email, "admin");
                  setOpenDropdown(null);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-theme-tertiary/50 text-left transition-colors duration-200 text-theme-primary"
              >
                <FaUserShield className="text-purple-500" />
                Make Admin
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  // Table columns configuration
  const userColumns = [
    {
      key: 'name',
      label: 'User',
      render: (value, item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-theme-tertiary/50 rounded-full flex items-center justify-center overflow-hidden">
            {item.avatar ? (
              <img
                src={item.avatar}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="text-theme-muted" />
            )}
          </div>
          <div>
            <p className="font-medium text-theme-primary">{value || 'Unknown'}</p>
            <p className="text-sm text-theme-muted">{item.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize backdrop-blur-sm ${getRoleBadgeClass(value)}`}>
          {value || 'donor'}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize backdrop-blur-sm ${getStatusBadgeClass(value)}`}>
          {value || 'active'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (value, item) => renderActions(item)
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-secondary/50 p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-theme-secondary">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-theme-secondary/50 p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-theme-card/95 backdrop-blur-xl rounded-2xl border-0 shadow-modern-2xl p-8 max-w-md">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaBan className="text-red-500 text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-theme-primary mb-2">Error Loading Users</h2>
            <p className="text-theme-secondary mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-secondary/50 p-4 sm:p-6 relative overflow-hidden">
      <DynamicTitle title="All Users" />

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-blue-600/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-theme-primary mb-2">User Management</h1>
              <p className="text-theme-secondary">Manage user roles, status, and permissions</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 bg-theme-tertiary/50 hover:bg-theme-tertiary/70 text-theme-primary px-4 py-2 rounded-xl font-medium transition-all duration-300 border-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="overview-cards-grid mb-6 sm:mb-8">
          <OverviewCard
            title="Active Users"
            value={stats.active}
            icon={FaUser}
            color="green"
            delay={0.1}
            subtitle="Currently active"
          />
          <OverviewCard
            title="Blocked Users"
            value={stats.blocked}
            icon={FaBan}
            color="red"
            delay={0.2}
            subtitle="Temporarily blocked"
          />
          <OverviewCard
            title="Admin Users"
            value={stats.admin}
            icon={FaUserShield}
            color="purple"
            delay={0.3}
            subtitle="System administrators"
          />
          <OverviewCard
            title="Volunteers"
            value={stats.volunteer}
            icon={FaUserFriends}
            color="blue"
            delay={0.4}
            subtitle="Platform volunteers"
          />
        </div>

        {/* Users Table */}
        <DataTable
          data={users}
          columns={userColumns}
          title="All Users"
          searchable={true}
          sortable={true}
          filterable={true}
          filters={[
            {
              key: 'status',
              label: 'Status',
              options: [
                { value: 'active', label: 'Active' },
                { value: 'blocked', label: 'Blocked' }
              ]
            },
            {
              key: 'role',
              label: 'Role',
              options: [
                { value: 'donor', label: 'Donor' },
                { value: 'volunteer', label: 'Volunteer' },
                { value: 'admin', label: 'Admin' }
              ]
            }
          ]}
          emptyMessage="No users found matching the criteria"
          className="mb-8"
        />
      </div>
    </div>
  );
};

export default AllUsers;
