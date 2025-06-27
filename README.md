Install the Packages - pipenv install flask python-dotenv sqlalchemy flask-sqlalchemy alembic flask-migrate

### Initialize migration

pipenv run flask db init

### Rivision (Creates Migration File)

pipenv run flask db migrate -m "<COMMIT>"

### Upgrade DB (APply to DB) - RUn on Shell

flask db upgrade
