from datetime import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime
from dotenv import load_dotenv
from flask_cors import CORS
import os

load_dotenv()  # take environment variables from .env.

# Create the Flask app
app = Flask(__name__)
CORS(app)

# Configure the PostgreSQL database
db_username = os.getenv('DB_USERNAME')
db_password = os.getenv('DB_PASSWORD')
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_username}:{db_password}@hello-world.cyuiuubfqou3.eu-north-1.rds.amazonaws.com/postgres'
db = SQLAlchemy(app)

# Define the SQLAlchemy model
class Log(db.Model):
    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(String(50), nullable=False, index=True)
    timestamp = Column(DateTime, nullable=False, index=True)
    status = Column(String(10), nullable=False, index=True)
    error_message = Column(String(255), nullable=False)
    request = Column(String(255), nullable=False)
    response = Column(String(255), nullable=False)

# Endpoint to record logs
@app.route('/api/record', methods=['POST'])
def record_log():
    data = request.get_json()

    log = Log(
        user_id = data['user_id'],
        timestamp = datetime.fromtimestamp(data['timestamp'] / 1000),
        status = data['status'],
        error_message = data['error_message'],
        request = data['request'],
        response = data['response']
    ) # type: ignore
    db.session.add(log)
    db.session.commit()
    return jsonify({"message": "Log recorded successfully"}), 201

# Endpoint to retrieve logs with timestamp filtering
@app.route('/api/logs')
def get_logs():
    # Get start and end timestamps from query parameters
    start_timestamp = request.args.get('start_unix')
    end_timestamp = request.args.get('end_unix')

    # Filter logs based on the timestamp range
    if start_timestamp and end_timestamp:
        start = datetime.fromtimestamp(float(start_timestamp))
        end = datetime.fromtimestamp(float(end_timestamp))
        logs = Log.query.filter(Log.timestamp.between(start, end)).order_by(Log.timestamp.desc()).all()
    else:
        logs = Log.query.order_by(Log.timestamp.desc()).all()

    logs_data = [{
        "user_id": log.user_id,
        "timestamp": log.timestamp.timestamp() * 1000,
        "status": log.status,
        "error_message": log.error_message,
        "request": log.request,
        "response": log.response,
        "id": log.id
    } for log in logs]
    return jsonify(logs_data)

# Endpoint to retrieve stats data with timestamp filtering
@app.route('/api/stats')
def get_stats():
    start_timestamp = request.args.get('start_unix')
    end_timestamp = request.args.get('end_unix')

    base_query = Log.query

    if start_timestamp and end_timestamp:
        start = datetime.fromtimestamp(float(start_timestamp))
        end = datetime.fromtimestamp(float(end_timestamp))
        base_query = base_query.filter(Log.timestamp.between(start, end))

    total_users = base_query.distinct(Log.user_id).count()
    total_calls = base_query.count()
    total_failures = base_query.filter_by(status='failure').count()

    return jsonify({
        "total_users": total_users,
        "total_calls": total_calls,
        "total_failures": total_failures
    })


with app.app_context():
    print("creating db tables...")
    db.create_all()
print("db tables created")

if __name__ == '__main__':
    print("running app on post 5001")
    app.run(host='0.0.0.0', port=5001)
