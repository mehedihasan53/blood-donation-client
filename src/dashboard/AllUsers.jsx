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
    admin: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-700",
    volunteer: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700",
    donor: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700"
  };
  return classes[role] || classes.donor;
};

const getStatusBadgeClass = (status) => {
  const classes = {
    active: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700",
    blocked: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700"
  };
  return classes[status] || classes.active;
};

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const stats = {
    active: users.filter((u) => u.status === "active").length,
    blocked: users.filter((u) => u.status === "blocked").length,
    admin: users.filter((u) => u.role === "admin").length,
    volunteer: users.filter((u) => u.role === "volunteer").length,
  };

  const renderActions = (u) => (
    <div className="relative">
      <button
        onClick={() =>
          setOpenDropdown(openDropdown === u.email ? null : u.email)
        }
        className="p-2 rounded-lg hover:bg-bg-tertiary/50 dark:hover:bg-bg-tertiary/30 transition-colors duration-200"
      >
        <FaEllipsisV className="text-text-muted" />
      </button>
      {openDropdown === u.email && (
        <div className="absolute right-0 mt-2 w-44 bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl border border-border-primary/50 dark:border-border-primary/60 rounded-xl shadow-lg dark:shadow-2xl z-10 overflow-hidden">
          <button
            onClick={() => {
              handleStatus(u.email, u.status);
              setOpenDropdown(null);
            }}
            className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-bg-tertiary/50 dark:hover:bg-bg-tertiary/30 text-left transition-colors duration-200 text-text-primary"
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
              className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-bg-tertiary/50 dark:hover:bg-bg-tertiary/30 text-left transition-colors duration-200 text-text-primary"
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
              className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-bg-tertiary/50 dark:hover:bg-bg-tertiary/30 text-left transition-colors duration-200 text-text-primary"
            >
              <FaUserShield className="text-purple-500" />
              Make Admin
            </button>
          )}
        </div>
      )}
    </div>
  );

  // Table columns configuration
  const userColumns = [
    {
      key: 'name',
      label: 'User',
      render: (value, item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-bg-tertiary/60 dark:bg-bg-tertiary/40 rounded-full flex items-center justify-center overflow-hidden">
            {item.avatar ? (
              <img
                src={item.avatar}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="text-text-muted" />
            )}
          </div>
          <div>
            <p className="font-medium text-text-primary">{value || 'Unknown'}</p>
            <p className="text-sm text-text-muted">{item.email}</p>
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
      <div className="text-center py-12">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-secondary/50 dark:bg-bg-secondary/30 p-4 sm:p-6">
      <DynamicTitle title="All Users" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-text-primary mb-2">User Management</h1>
        <p className="text-text-secondary">Manage user roles, status, and permissions</p>
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
  );
};

export default AllUsers;
