import { Dialog } from "@headlessui/react";
import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function AddEmployeeModal({
  isOpen,
  onClose,
  refreshEmployees,
}) {
  const [employee, setEmployee] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    department: "",
    designation: "",
    joiningDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/employees", employee);

      toast.success("Employee Added Successfully");

      refreshEmployees();

      onClose();

      setEmployee({
        fullName: "",
        email: "",
        mobileNumber: "",
        department: "",
        designation: "",
        joiningDate: "",
      });
    } catch (error) {
      toast.error("Failed to add employee");
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
        <div className="bg-linear-to-r from-green-600 to-emerald-500 p-6 text-white">
          <Dialog.Title className="text-3xl font-bold">
            Add Employee
          </Dialog.Title>

          <p className="text-green-100 mt-1">
            Enter employee information below
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
                placeholder="Enter Full Name"
                value={employee.fullName}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    fullName: e.target.value,
                  })
                }
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                value={employee.email}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    email: e.target.value,
                  })
                }
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Mobile Number
              </label>

              <input
                type="text"
                placeholder="Enter Mobile Number"
                value={employee.mobileNumber}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    mobileNumber: e.target.value,
                  })
                }
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Department
              </label>

              <input
                type="text"
                placeholder="Enter Department"
                value={employee.department}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    department: e.target.value,
                  })
                }
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Designation
              </label>

              <input
                type="text"
                placeholder="Enter Designation"
                value={employee.designation}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    designation: e.target.value,
                  })
                }
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Joining Date
              </label>

              <input
                type="date"
                value={employee.joiningDate}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    joiningDate: e.target.value,
                  })
                }
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                required
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
              className="px-6 py-3 bg-linear-to-r from-green-600 to-emerald-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
            >
              Save Employee
            </button>
          </div>
        </form>
      </Dialog.Panel>
    </div>
  </Dialog>
);
}

export default AddEmployeeModal;