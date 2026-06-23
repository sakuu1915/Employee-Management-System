import {
  FiEdit,
  FiTrash2,
  FiMail,
  FiBriefcase,
} from "react-icons/fi";

function EmployeeTable({
  employees,
  onDelete,
  onEdit,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">
            <th className="p-4 text-left">
              Employee
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Department
            </th>

            <th className="p-4 text-left">
              Designation
            </th>

            <th className="p-4 text-left">
              Joining Date
            </th>

            <th className="p-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp, index) => (
            <tr
              key={emp._id}
              className={`border-b hover:bg-blue-50 transition duration-200 ${
                index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50"
              }`}
            >
              {/* Name */}
              <td className="p-4">
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {emp.fullName}
                  </h3>

                  <p className="text-xs text-gray-500">
                    Employee
                  </p>
                </div>
              </td>

              {/* Email */}
              <td className="p-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <FiMail />
                  {emp.email}
                </div>
              </td>

              {/* Department */}
              <td className="p-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {emp.department}
                </span>
              </td>

              {/* Designation */}
              <td className="p-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <FiBriefcase />
                  {emp.designation}
                </div>
              </td>

              {/* Joining Date */}
              <td className="p-4 text-gray-700">
                {new Date(
                  emp.joiningDate
                ).toLocaleDateString()}
              </td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(emp)}
                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition"
                  >
                    <FiEdit />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      onDelete(emp._id)
                    }
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;