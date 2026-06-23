import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function EditEmployeeModal({ isOpen, onClose, employeeId, refreshEmployees }) {
  const [employee, setEmployee] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    department: "",
    designation: "",
    joiningDate: "",
  });

  useEffect(() => {
    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);

  const fetchEmployee = async () => {
    try {
      const { data } = await API.get(`/employees/${employeeId}`);

      setEmployee(data);
    } catch (error) {
      toast.error("Failed to load employee");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/employees/${employeeId}`, {
        fullName: employee.fullName,
        email: employee.email,
        mobileNumber: employee.mobileNumber,
        department: employee.department,
        designation: employee.designation,
        joiningDate: employee.joiningDate,
      });

      toast.success("Employee Updated");

      refreshEmployees();

      onClose();
    } catch (error) {
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Update Failed");
    }
  };

  return (
  <Dialog
    open={isOpen}
    onClose={onClose}
    className="relative z-50"
  >
    {/* Backdrop */}
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md" />

    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Panel className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h2 className="text-3xl font-bold">
            Edit Employee
          </h2>

          <p className="text-blue-100 mt-1">
            Update employee information
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-semibold mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={employee.fullName}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    fullName: e.target.value,
                  })
                }
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                value={employee.email}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    email: e.target.value,
                  })
                }
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Mobile Number
              </label>

              <input
                type="text"
                value={employee.mobileNumber}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    mobileNumber: e.target.value,
                  })
                }
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Department
              </label>

              <input
                type="text"
                value={employee.department}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    department: e.target.value,
                  })
                }
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Designation
              </label>

              <input
                type="text"
                value={employee.designation}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    designation: e.target.value,
                  })
                }
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Joining Date
              </label>

              <input
                type="date"
                value={
                  employee.joiningDate
                    ? employee.joiningDate.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    joiningDate: e.target.value,
                  })
                }
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:scale-105 transition"
            >
              Update Employee
            </button>
          </div>
        </form>
      </Dialog.Panel>
    </div>
  </Dialog>
);
}

export default EditEmployeeModal;
