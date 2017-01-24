process.env.PWD = process.cwd()
require('isomorphic-fetch')

const bodyParser = require('body-parser')
const callback = require('./routes/auth/callback')
const chalk = require('chalk')
const config = require('config')
const express = require('express')

const COBOT_CLIENT_ID = config.get('cobotClientId')
const COBOT_TOKEN = config.get('cobotToken')
const COBOT_CLIENT_SECRET = config.get('cobotClientSecret')
const HOST = config.get('host')
const PORT = config.get('port')
const FRONTEND_PATH = process.env.PWD + '/public'

//https://www.cobot.me/oauth/authorize?response_type=code&client_id=b92a2ce04f5372173f16ea069e58d1ce&redirect_uri=http://localhost:6868/auth/callback&scope=read

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
//app.use(session({
  //secret: 'keyboard cat',
  //resave: false,
  //saveUninitialized: true,
  //cookie: { secure: true }
//}))

// Get a new 
app.get('/auth/callback', callback)

app.use(express.static(FRONTEND_PATH))

app.listen(PORT)

console.log(chalk.green('🌎  App starting on port'), chalk.blue.underline(PORT))
console.log(
  '⚙ ',
  chalk.yellow('COBOT_CLIENT_ID'),
  chalk.gray(COBOT_CLIENT_ID)
)
console.log(
  '⚙ ',
  chalk.yellow('COBOT_CLIENT_SECRET'),
  chalk.gray(COBOT_CLIENT_SECRET)
)
console.log(
  '⚙ ',
  chalk.yellow('COBOT_TOKEN'),
  chalk.gray(COBOT_TOKEN)
)
console.log(
  '⚙ ',
  chalk.yellow('HOST'),
  chalk.gray(HOST)
)
