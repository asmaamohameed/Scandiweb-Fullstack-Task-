import { createContext, useContext, useState } from "react";

type ToastType = "success" | "error";
interface Toast {
  message: string;
  type: ToastType;
}

const ToastContext = createContext({
  showToast: (_: string, __?: ToastType) => {},
});
export const useToast = () => useContext(ToastContext);
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null);
  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className={`fixed top-5 right-5 px-4 py-5 rounded shadow-lg animate-slide-in z-50 text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};
