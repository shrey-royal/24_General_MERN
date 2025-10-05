export default function PaymentForm({ cardInfo, setCardInfo }) {
    const handleChange = (e) => {
        setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Card Details</h3>

            <input
                type="text"
                name="cardNumber"
                value={cardInfo.cardNumber || ""}
                onChange={handleChange}
                placeholder="Card Number (4111111111111111)"
                required
                className="w-full border rounded-lg px-4 py-2"
            />

            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    name="expiration"
                    value={cardInfo.expiration || ""}
                    onChange={handleChange}
                    placeholder="Expiration (YYYY-MM)"
                    required
                    className="w-full border rounded-lg px-4 py-2"
                />
                <input
                    type="text"
                    name="cardCode"
                    value={cardInfo.cardCode || ""}
                    onChange={handleChange}
                    placeholder="CVV"
                    required
                    className="w-full border rounded-lg px-4 py-2"
                />
            </div>
        </div>
    );
}
