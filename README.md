# Incode

# Dummy User

email : user@incode.com
password : user@incode.com

# Dummy Admin

email : admin@incode.com
password : admin@incode.com

## Pages

- /game-list - List of Availble Games
- /game/:id - Play Game (Private Route, Only user and admin can play)
- /login - Login as User/Admin
- /register - Create user Account
- /admin/register - creates admin account
- /admin/manage-game - List of Games added by Admin

## Rule

Admin has to create at /admin/add-game route, after creating the game he has to create Lessons at /admin/edit-game/2 page.

Install the Packages - pipenv install flask python-dotenv sqlalchemy flask-sqlalchemy alembic flask-migrate

### Initialize migration

pipenv run flask db init

### Rivision (Creates Migration File)

pipenv run flask db migrate -m "<COMMIT>"

### Upgrade DB (APply to DB) - RUn on Shell

flask db upgrade
