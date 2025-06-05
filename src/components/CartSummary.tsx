import { Button } from "@/components/ui/button";

const CartSummary = ({ cart, course, onRemoveFromCart, onBuyCart }) => {
  const calculateTotal = () => {
    let total = cart.reduce((sum, sessionId) => {
      const session = course.sessions.find((s) => s._id === sessionId);
      return sum + (session?.price.amount || 0);
    }, 0);
    if (cart.length === 1 || cart.length < course.sessions.length) {
      total = total * 0.9;
    } else if (cart.length === course.sessions.length) {
      total = total * 0.8;
    }
    return total.toFixed(2);
  };

  const originalTotal = cart
    .reduce((sum, sessionId) => {
      const session = course.sessions.find((s) => s._id === sessionId);
      return sum + (session?.price.amount || 0);
    }, 0)
    .toFixed(2);

  const total = calculateTotal();
  const isDiscounted = parseFloat(total) < parseFloat(originalTotal);

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-80 max-w-full z-50">
      <h3 className="text-lg font-bold mb-2">Your Cart</h3>
      <ul className="mb-2 max-h-48 overflow-auto">
        {cart.map((sessionId) => {
          const session = course.sessions.find((s) => s._id === sessionId);
          return (
            <li
              key={sessionId}
              className="flex justify-between items-center mb-1"
            >
              <span className="block w-40 truncate">{session?.title}</span>
              <div>
                <span>₹{session?.price.amount}</span>
                <button
                  className="ml-3 text-red-500 hover:text-red-700 font-bold"
                  onClick={() => onRemoveFromCart(sessionId)}
                >
                  ×
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {isDiscounted && (
        <div className="text-sm text-green-600 mb-1">
          <span className="line-through">₹{originalTotal}</span>
          <span className="ml-2">
            {cart.length === course.sessions.length ? "20%" : "10%"} discount
            applied!
          </span>
        </div>
      )}
      <div className="flex justify-between font-semibold text-gray-800 mb-2">
        <span>Total:</span> <span>₹{total}</span>
      </div>
      <Button onClick={onBuyCart} className="w-full">
        Buy Now
      </Button>
    </div>
  );
};

export default CartSummary;
