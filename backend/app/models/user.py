from .db import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(255), nullable=False)
  email = db.Column(db.String(255), unique=True, nullable=False,)
  password = db.Column(db.String(255), nullable=False)
  role = db.Column(db.String(255), nullable=False, default='user')


  def to_dict(self):
    return {
      'id' : self.id,
      'name' : self.name, 
      'email' : self.email,
      'role' : self.role
    }