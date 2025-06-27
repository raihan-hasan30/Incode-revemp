import os

class Config:
  SECRET_KEY = os.environ.get('SECRET_KEY')
  FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
  SQLALCHEMY_DATABASE_URI = os.environ.get(
      'DATABASE_URL').replace('postgres://', 'postgresql://')
  FLASK_ENV = os.environ.get("FLASK_ENV")
  SQLALCHEMY_TRACK_MODIFICATIONS = False