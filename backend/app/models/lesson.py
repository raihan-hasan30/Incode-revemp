from .db import db

class Lesson(db.Model):
  __tablename__ = "lessons"

  id = db.Column(db.Integer, primary_key = True)
  lessonName = db.Column(db.String(255), nullable=False)
  cmd = db.Column(db.String(255), nullable=False)
  gameId = db.Column(db.Integer, nullable=False)
  
  def to_dict(self):
    return {
      'id': self.id,
      'lessonName': self.lessonName,
      'cmd': self.cmd,
      'gameId': self.gameId,
    } 