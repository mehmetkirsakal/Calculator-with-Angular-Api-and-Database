# Calculator with database and api

Calculator file runs at angular 4200 localhost, Rest-api file runs at 3000 localhost. 

## Steps to run code

1- Clone this repository with below code:
```git
 git clone https://github.com/mehmetkirsakal/Calculator-with-Angular-Api-and-Database.git
```
2- open project directory in Visual Studio Code
3- in Rest-Api directory there is index.js, you need a database to work with this project. i used postgreSQL for my database, create your database and put database integration codes accordingly in const client = new Client({}) section.
4-Go to Rest-Api directory with cd resp-api
5- run api service  with below code (host :3000)
```cmd
node .\index.js
```
6- Come back to project directory with cd .. and go to Calculator directory with cd Calculator
7- run angular service with below code (host :4200)
```cmd
ng serve
```
