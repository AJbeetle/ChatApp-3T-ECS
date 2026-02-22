Backend and DB Schema Setup for Three Tier ECS Architecture


Populate the env file accordingly to run the app
a) Run redis on your machine using docker container : docker run -d -p 6379:6379 redis
   
   -> Install redis-tools : sudo apt install redis-tools
   -> run this command to confirm redis works : redis-cli ping 
   It should return PONG

b) Setup postgresql locally :  sudo apt install postgresql postgresql-contrib

   -> sudo systemctl status postgresql
   -> sudo -u postgres psql   
   -> CREATE DATABASE chatapp;
   -> CREATE USER chatuser WITH PASSWORD '1234';
   -> ALTER DATABASE chatapp OWNER TO chatuser;
   -> GRANT ALL PRIVILEGES ON DATABASE chatapp TO chatuser;

   then quit postgres terminal -> \q

   and try logging in using user you created : psql -h localhost -U chatuser -d chatapp


c) Run following psql command to setup postgres schema, locally in your machine

> psql -h localhost -U <username> -d <databaseName> -f sql/schema.sql
example : psql -h localhost -U chatuser -d chatapp -f sql/schema.sql


