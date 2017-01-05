var express = require('express')
  , logger = require('morgan')
  , app = express()
  , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

app.get('/', function (req, res, next) {
  try {
    var html = template({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.set('views', './source/templates')
app.set('view engine', 'pug')

app.get('/:path', function (req, res, next) {
  try {
    switch (req.params.path) {
      case 'home':
        res.render('homepage.jade')
        break;
      case 'story':
        res.render('story.jade')
        break;
      case 'wedding':
        res.render('wedding.jade')
        break;
	  case 'accommodations':
        res.render('accommodations.jade')
        break;
	  case 'registry':
        res.render('registry.jade')
        break;
      default:
		res.render('homepage.jade')
    }


  } catch (e) {
    next(e)
  }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})