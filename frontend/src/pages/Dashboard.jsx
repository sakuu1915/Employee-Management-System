import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import EmployeeTable from "../components/EmployeeTable";
import DeleteModal from "../components/DeleteModal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiUsers, FiSearch } from "react-icons/fi";
import AddEmployee from "../pages/AddEmployee";
import EditEmployeeModal from "../pages/EditEmployeeModal";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, [search, department, sortOrder, page]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(
        `/employees?search=${search}&department=${department}&order=${sortOrder}&page=${page}`,
      );

      setEmployees(data.employees);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Failed to load employees");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenEditModal(true);
  };

  const deleteEmployee = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/employees/${selectedId}`);

      toast.success("Employee Deleted");

      setOpenModal(false);

      fetchEmployees();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 p-3 sm:p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">
            Employee Management
          </h1>

          <p className="text-gray-500">Manage your employees efficiently</p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl shadow"
        >
          Logout
        </button>
      </motion.div>

      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
>
  {/* Total Employees */}
  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-blue-500 hover:shadow-xl transition">
    <div className="flex items-center gap-3">
      <FiUsers size={30} className="text-blue-500" />

      <div>
        <h3 className="text-gray-500 text-sm">Total Employees</h3>
        <p className="text-3xl font-bold text-blue-600">
          {employees.length}
        </p>
      </div>
    </div>
  </div>

  {/* Department */}
  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-green-500 hover:shadow-xl transition">
    <div>
      <h3 className="text-gray-500 text-sm">Department Filter</h3>
      <p className="text-2xl font-bold text-green-600">
        {department || "All"}
      </p>
    </div>
  </div>

  {/* Sort */}
  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-purple-500 hover:shadow-xl transition">
    <div>
      <h3 className="text-gray-500 text-sm">Sort Order</h3>
      <p className="text-2xl font-bold text-purple-600">
        {sortOrder === "desc" ? "Newest" : "Oldest"}
      </p>
    </div>
  </div>

  {/* Page */}
  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-orange-500 hover:shadow-xl transition">
    <div>
      <h3 className="text-gray-500 text-sm">Current Page</h3>
      <p className="text-3xl font-bold text-orange-600">
        {page}
      </p>
    </div>
  </div>
</motion.div>
      {/* Search + Add Employee */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-3" size={18} />

          <input
            type="text"
            placeholder="Search Employee..."
            className="w-full border rounded-xl pl-10 p-3 shadow-sm focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          onClick={() => setOpenAddModal(true)}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-lg transition-all hover:scale-105"
        >
          Add Employee
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <select
          className="border p-3 rounded-xl shadow-sm w-full sm:w-auto"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select
          className="border p-3 rounded-xl shadow-sm w-full sm:w-auto"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Employee Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg overflow-x-auto"
      >
        {loading ? (
          <Loader />
        ) : employees.length === 0 ? (
          <EmptyState />
        ) : (
          <EmployeeTable
            employees={employees}
            onDelete={deleteEmployee}
            onEdit={handleEdit}
          />
        )}
      </motion.div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="w-full sm:w-auto bg-blue-500 text-white px-5 py-2 rounded-lg disabled:bg-gray-300"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="w-full sm:w-auto bg-blue-500 text-white px-5 py-2 rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
      <AddEmployee
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        refreshEmployees={fetchEmployees}
      />
      <EditEmployeeModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        employeeId={selectedEmployee?._id}
        refreshEmployees={fetchEmployees}
      />
      <DeleteModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Dashboard;
