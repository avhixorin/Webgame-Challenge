import toast from "react-hot-toast";

const showToastMessage = (
  message: string,
  icon: string,
  bgColor: string,
  duration: number = 4000
) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-xs w-full ${bgColor} shadow-lg rounded-lg pointer-events-auto flex items-center p-4 ring-1 ring-black ring-opacity-5`}
    >
      <span className="text-2xl">{icon}</span>
      <div className="ml-3 flex-1">
        <p className="text-sm font-semibold text-white">{message}</p>
      </div>
    </div>
  ), { duration });
};

export default showToastMessage;
