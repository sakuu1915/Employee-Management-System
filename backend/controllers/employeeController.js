const Employee = require("../models/Employee");
const employeeSchema = require("../validators/employeeValidator");


// Add Employee
exports.addEmployee = async (req, res) => {
  try {
    const { error } = employeeSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const employee = await Employee.create(req.body);

    res.status(201).json(employee);
  } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);

  res.status(500).json({
    message: error.response?.data?.message || "Update Failed"
  });
}
};

// Get Employees with Search, Pagination, Sorting
exports.getEmployees = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const search = req.query.search || "";
    const department = req.query.department || "";

    const sortOrder = req.query.order === "asc" ? 1 : -1;

    const query = {
      fullName: {
        $regex: search,
        $options: "i",
      },
    };

    // Department Filter
    if (department) {
      query.department = department;
    }

    const total = await Employee.countDocuments(query);

    const employees = await Employee.find(query)
      .sort({ joiningDate: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      employees,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Employee
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  try {

    const { error } = employeeSchema.validate(req.body);

    if (error) {
    
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(employee);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};