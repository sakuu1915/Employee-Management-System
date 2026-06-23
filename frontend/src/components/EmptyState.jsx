function EmptyState() {
  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-semibold text-gray-700">
        No Employees Found
      </h2>

      <p className="text-gray-500 mt-2">
        Add your first employee.
      </p>
    </div>
  );
}

export default EmptyState;