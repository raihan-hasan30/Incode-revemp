import os
from flask_sqlalchemy import SQLAlchemy

# Extracting the envs
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

db = SQLAlchemy()

