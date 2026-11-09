
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


PICKUP_LOCATION = (
    "No. 6, Ilesha Close, Area 3, Garki, Abuja, Nigeria"
)


def calculate_delivery_fee(distance_km):
    if distance_km < 0:
        raise ValueError("Distance cannot be negative.")

    if distance_km <= 5:
        return 1500
    elif distance_km <= 10:
        return 2000
    elif distance_km <= 25:
        return 3500
    else:
        return 6500


@app.route("/")
def home():
    return "Meenad's Fragrances backend is running!"


@app.route("/api/delivery-fee", methods=["POST"])
def delivery_fee():
    data = request.get_json(silent=True) or {}

    # Prototype only: this is a test distance, not a real route.
    try:
        distance_km = float(data.get("distance_km"))
    except (TypeError, ValueError):
        return jsonify({"error": "Enter a valid test distance."}), 400

    if not 0 <= distance_km <= 50:
        return jsonify({
            "error": "Test distance must be between 0 and 50 km."
        }), 400

    fee = calculate_delivery_fee(distance_km)

    return jsonify({
        "test_mode": True,
        "distance_km": distance_km,
        "delivery_fee": fee,
        "currency": "NGN"
    })


if __name__ == "__main__":
    app.run(debug=True)
