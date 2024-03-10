const ErrorDropdown = ({ error }: { error: Error | null }) => {
  return (
    <div className="p-4 opacity-80">
      <p>Could not find data with what you typed.</p>
      <p className="text-xs">(Error: {error?.message})</p>
    </div>
  );
};

export default ErrorDropdown;
