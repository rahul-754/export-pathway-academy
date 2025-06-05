import { CheckCircle } from "lucide-react";

const PaymentSuccessDialog = ({
  onClose,
  onGoToDashboard,
}: {
  onClose: () => void;
  onGoToDashboard: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-sm w-full">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">You've been enrolled successfully.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
          >
            Stay Here
          </button>
          <button
            onClick={onGoToDashboard}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessDialog;
