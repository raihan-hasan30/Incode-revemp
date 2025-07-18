from flask import Blueprint, request, jsonify
import random
import requests
import base64
from app.models.game import Games, db
from flask_login import login_required



game_routes = Blueprint("game", __name__)


@game_routes.route("/")
def getGames():
   try:
      allGames = Games.query.all()

      return jsonify([{
            **quest.to_dict()
        } for quest in allGames])
   except Exception as e:
      return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500

@game_routes.route("/<int:id>")
def get_game_by_id(id):
   try:
      singleGame = Games.query.get(id)

      if singleGame is None:
         return jsonify({"error" : "No Lesson with that id found"})

      return jsonify(singleGame.to_dict())
   except Exception as e:
      return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500
   

@game_routes.route('/<int:id>', methods=["DELETE"])
def delete_game(id):
  try:
    game = Games.query.get(id)
    if not game:
      return jsonify({"error": "Game not found"}), 404

    db.session.delete(game)
    db.session.commit()
    return jsonify({"message": "Game deleted successfully"}), 200
  except Exception as e:
    return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500

@game_routes.route("/add-game", methods=['POST'])
@login_required
def createGame():
  try:
    data = request.form
    game_name = data.get('game_name')
    logo_file = request.files.get('logo')
    
    if logo_file:
      allowed_extensions = {'jpg', 'jpeg', 'png'}
      file_extension = logo_file.filename.lower().split('.')[-1] if logo_file.filename else ''
      if file_extension not in allowed_extensions:
        return jsonify({"error": "Only JPG and PNG images are allowed"}), 400

    api_key = "3e7a21b1b8dcf53252187e2c4113e557"
    logo_bytes = logo_file.read()
    logo_b64 = base64.b64encode(logo_bytes).decode('utf-8')

    imgbb_url = f"https://api.imgbb.com/1/upload?expiration=null&key={api_key}"
    payload = {
      "image": logo_b64
    }
    response = requests.post(imgbb_url, data=payload)
    if response.status_code == 200:
      logo_url = response.json()['data']['url']
    else:
      return jsonify({"error": "Failed to upload logo"}), 500
    
    newGame = Games(
      name=game_name,
      logo=logo_url
    )

    db.session.add(newGame)
    db.session.commit()
    return jsonify({
      **newGame.to_dict()
    }), 201
  except Exception as e:
        return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500

@login_required
@game_routes.route('/<int:id>', methods=["PATCH"])
def update_game(id):
  try:
    game = Games.query.get(id)
    if not game:
      return jsonify({"error": "Game not found"}), 404

    data = request.form
    logo_file = request.files.get('logo')
    
    game_name = data.get('game_name')
    if game_name:
      game.name = game_name
    
    if logo_file:
      allowed_extensions = {'jpg', 'jpeg', 'png'}
      file_extension = logo_file.filename.lower().split('.')[-1] if logo_file.filename else ''
      if file_extension not in allowed_extensions:
        return jsonify({"error": "Only JPG and PNG images are allowed"}), 400
        
      api_key = "3e7a21b1b8dcf53252187e2c4113e557"
      logo_bytes = logo_file.read()
      logo_b64 = base64.b64encode(logo_bytes).decode('utf-8')

      imgbb_url = f"https://api.imgbb.com/1/upload?expiration=null&key={api_key}"
      payload = {
        "image": logo_b64
      }
      response = requests.post(imgbb_url, data=payload)
      if response.status_code == 200:
        logo_url = response.json()['data']['url']
        game.logo = logo_url
      else:
        return jsonify({"error": "Failed to upload new logo"}), 500

    db.session.commit()
    return jsonify({
      "message": "Game updated successfully",
      **game.to_dict()
    }), 200
    
  except Exception as e:
    db.session.rollback()
    return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500