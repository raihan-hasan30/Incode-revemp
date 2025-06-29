from flask import Blueprint, request, jsonify, send_from_directory, current_app
import random
import requests
import base64
from app.models.lesson import Lesson, db


lesson_routes = Blueprint("lesson", __name__)

@lesson_routes.route("/create", methods=['POST'])
def create_lesson():
   data = request.get_json()

   if 'cmd' not in data:
      return jsonify({'error' : 'cmd filed is msising'})
   

   if 'lessonName' not in data:
      return jsonify({'error' : 'cmd filed is msising'})
   

   if 'gameId' not in data:
      return jsonify({'error' : 'cmd filed is msising'})
   
   new_lesson = Lesson(
      lessonName = data['lessonName'],
      cmd = data['cmd'],
      gameId = data['gameId'],
   )

   db.session.add(new_lesson)
   db.session.commit()

   return jsonify(new_lesson.to_dict()), 200


@lesson_routes.route("/<int:game_id>")
def get_lessons(game_id):
  try:
    lessons = Lesson.query.filter_by(gameId = game_id).all()
    return jsonify([lesson.to_dict() for lesson in lessons])
  except Exception as e:
      return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500


@lesson_routes.route("/<int:id>", methods=["PATCH"])
def update_lesson(id):
  try:
   lessons = Lesson.query.get(id)

   if lessons is None:
      return jsonify({"errors": ["Cannot find the lesson.", ]}), 404

   data = request.get_json()

   if 'lessonName' in data:
      lessons.lessonName = data['lessonName']

   if 'cmd' in data:
      lessons.cmd = data['cmd']

   if 'gameId' in data:
      lessons.gameId = data['gameId']

   db.session.commit()

   return jsonify(lessons.to_dict())

  except Exception as e:
      return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500


@lesson_routes.route("/<int:lesson_id>", methods=["DELETE"])
def delete_lessson(lesson_id):
  try:
   lessons = Lesson.query.get(lesson_id)

   if lessons is None:
      return jsonify({"errors": ["Cannot find the lesson.", ]}), 404

   db.session.delete(lessons)
   db.session.commit()

   return jsonify({
      "message": "Deleted Successfully",
   }), 200
   

   return jsonify(lessons.to_dict())

  except Exception as e:
      print(e)
      return jsonify({"errors": ["Server error. Please try again.", str(e)]}), 500