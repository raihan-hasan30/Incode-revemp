from flask import Blueprint, request, jsonify, send_from_directory, current_app
import random
from werkzeug.utils import secure_filename
import requests
import base64
from app.models.game import Games, db


game_routes = Blueprint("game", __name__)


@game_routes.route("/add-game", methods=['POST'])
def createGame():
  try:
    data = request.form
    game_name = data.get('game_name')
    logo_file = request.files.get('logo')
  

    # Upload logo to imgbb

    api_key = "3e7a21b1b8dcf53252187e2c4113e557"
    logo_bytes = logo_file.read()
    logo_b64 = base64.b64encode(logo_bytes).decode('utf-8')

    imgbb_url = f"https://api.imgbb.com/1/upload?expiration=600&key={api_key}"
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

      