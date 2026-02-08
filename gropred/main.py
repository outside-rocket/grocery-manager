from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

print("STARTING SERVER...")


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///gropred.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# ---------------- MODEL ---------------- #

class Purchase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    purchase_date = db.Column(db.Date, nullable=False)
    daily_usage = db.Column(db.Float, nullable=False)
    predicted_runout_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), default="active")

# Create DB + table automatically
with app.app_context():
    db.create_all()

# ---------------- ROUTES ---------------- #

@app.route("/add", methods=["POST"])
def add_item():

    data = request.json

    name = data["name"]
    quantity = float(data["quantity"])
    purchase_date = datetime.strptime(data["purchase_date"], "%Y-%m-%d")

    daily_usage = 100
    runout_date = purchase_date + timedelta(days=(quantity / daily_usage))

    item = Purchase(
        name=name,
        quantity=quantity,
        purchase_date=purchase_date,
        daily_usage=daily_usage,
        predicted_runout_date=runout_date,
        status="active"
    )

    db.session.add(item)
    db.session.commit()

    return jsonify({"message": "Inserted"})


@app.route("/active")
def active_items():

    items = Purchase.query.filter_by(status="active").all()

    data = []
    for i in items:
        days_left = (i.predicted_runout_date - datetime.now().date()).days

        data.append({
            "id": i.id,
            "name": i.name,
            "quantity": i.quantity,
            "purchase_date": str(i.purchase_date),
            "predicted_runout_date": str(i.predicted_runout_date),
            "days_left": days_left
        })

    return jsonify(data)


@app.route("/finish/<int:item_id>", methods=["PATCH"])
def finish_item(item_id):

    item = Purchase.query.get_or_404(item_id)
    item.status = "finished"

    db.session.commit()

    return jsonify({"message": "updated"})




if __name__ == "__main__":
    print("RUNNING APP")
    app.run(debug=True, port=8080)
