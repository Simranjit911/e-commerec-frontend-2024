function Loader({ span, roles = "status" }) {
  return (
    <div className="flex items-center w-full h-full justify-center">
      <div
        className="w-8 h-8 border-4 border-b-blue-500 border-cyan rounded-full border-b-gray animate-spin"
        role={roles}
      />
      <span className="ml-2">{span}</span>
    </div>
  );
}

export default Loader;
