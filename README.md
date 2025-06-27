Install the Packages - pipenv install flask python-dotenv sqlalchemy flask-sqlalchemy alembic flask-migrate

### Initialize migration

pipenv run flask db init

### Rivision

pipenv run flask db migrate -m "<COMMIT>"
