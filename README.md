# Associations

##Installation

* Check out a copy of the source from git: `$ git clone https://github.com/mano-mykingdom/Associations.git`
* Navigate to root directory of the project: `$ cd Associations`
* Download all the required node modules: `$ npm install`
* Assuming you have already installed PostgreSQL in your local machine, open `pgAdmin III` and create a new database
* Now restore the backup file `pgsql` found at root directory of the project to the newly created database
* Make a copy of `config.js.sample` found at root directory of the project and rename it to `config.js`
* Open `config.js` and update the connection object

```
       //connection details for database
       db: {
           client: 'pg',
           connection: {
               host: '127.0.0.1',
               user: 'YOUR_USER',
               password: 'YOUR_PASSWORD',
               database: 'YOUR_DATABASE',
               charset: 'utf8'
           }
       }
```

* Now copy your `ext` framework directory to `Associations/app/ext`.
* Navigate to ext app directory `$ cd app`
* Assuming you have access to `sencha` command line tools, now hit `$ sencha app build development`
* Navigate back to root directory of the project `$ cd ..`
* Now hit `$ node server.js` which will start the node server at [http://localhost:3000/](http://localhost:3000/)
