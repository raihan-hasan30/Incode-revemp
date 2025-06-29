from flask import Blueprint, request, jsonify, send_from_directory, current_app
import random
import requests
import base64
from app.models.user import User, db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user

user_routes = Blueprint("user", __name__)

@user_routes.route("/create-account", methods=["POST"])
def create_account():
  data = request.get_json()

  if data["name"] is None:
    return jsonify({"error" : "Name is reqiuired"})
  
  if data["password"] is None:
    return jsonify({"error" : "Password is reqiuired"})
  
  if data["email"] is None:
    return jsonify({"error" : "Email is reqiuired"})
  
  hashed_password = generate_password_hash(data["password"])

  check_if_exists = User.query.filter_by(email=data['email']).first()
  if check_if_exists :
    return jsonify({"error" : "User already exists"}), 422

  new_user_data = User(
    name=data['name'],
    email=data['email'],
    password=hashed_password,
    role=data['role'] or "user"
  )

  db.session.add(new_user_data)
  db.session.commit()
  login_user(new_user_data)

  return jsonify({
      'message': 'success',
      'user': new_user_data.to_dict()
  }), 200
  
  pass


@user_routes.route("/login", methods=["POST"])
def login_to_account():
  data = request.get_json()

  if data['email'] is None:
    return jsonify({"error": "Email is required"})
  
  if data['password'] is None:
    return jsonify({'error': "Password is msising"})
  
  user_info = User.query.filter_by(email=data['email']).first()
  if(not user_info):
    return jsonify({'error': "User Not found"}), 401
  
  if not check_password_hash(user_info.password, data['password']):
    return jsonify({'error': 'Invalid credentials'}), 401
  
  login_user(user_info)
  return jsonify({'message': 'success', 'user': user_info.to_dict()})


@user_routes.route("/logout")
def logout_from_account():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200

@user_routes.route("/me")
def get_me():
  return jsonify({"user": current_user.to_dict()}), 200