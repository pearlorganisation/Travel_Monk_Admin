const Modal = ({ closeModal, children }) => (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={closeModal}
    >
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-10/12 md:w-3/4 lg:w-2/3 xl:w-7/12 max-h-[70vh] overflow-auto p-6"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                onClick={closeModal}
            >
                ✕
            </button>
            {children}
        </div>
    </div>
);

export default Modal;