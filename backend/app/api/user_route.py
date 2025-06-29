from flask import Blueprint, request, jsonify, send_from_directory, current_app
import random
import requests
import base64
from app.models.user import User, db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user

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
  }), 201
  
  pass


@user_routes.route("/login", methods=["POST"])
def login_to_account():
  pass


@user_routes.route("/me")
def get_me():
  pass