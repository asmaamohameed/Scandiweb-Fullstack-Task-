const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white backdrop-blur-sm">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
    </div>
  );
};

export default Loading;
