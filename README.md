# ScrapeForNews

Scrape For News allows user to scrape for latest news from Vietcetera website inclusing headline, summary and url link.
The user can add save their favorite article, comment on the saved article or delete the article when the user no longer need it. 

# Dependencies
Install the following node modules
* `<npm i express>`
* `<npm i express-handlebars>`
* `<npm i mongoose>`
* `<npm i cheerio>`
* `<npm i axios>`

# Deployment on Heroku - Demo
You can access the deployment of the app on Heroku by [Click here!](https://scrapefornews.herokuapp.com/)

# Routes
Routes | To Do
------------ | -------------
GET (/scrape) | To read all the scraped article in JSON format
GET (/articles) | To read all the scraped article on the client side
GET (/article/:id) | To read a specific article with its note attached on the client side
GET (/saved) | To read saved article on the client side
DELETE (/delete/:id) | To delete a saved article on the client side
PUT (/api/articles/:id) | To make an update to the database that the article is saved
DELETE (/api/delete/:id) | To delete a saved article from the database



