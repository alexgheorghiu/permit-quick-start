var express = require('express');
var permit = require('permit');
var session = require('express-session');
var db = require('./db');

/**
 * [RO] Subclasa a clasei Permit care face autentificarea
 * [EN] Permit subclass used for authentication
 * */
class FormPermit extends permit.Permit {
  check(req){    
    if(req.body.username && req.body.password){      
      var user = db.users.findByUsernameAndPassword(req.body.username, req.body.password)
      return user
    }    
  }
}


//[RO] Permis folosit de aplicatie
//[EN] Permit used by the app
const basicPermit = new FormPermit();

//
var app = express();


// [EN] Configure view engine to render EJS templates.
// [RO] Configurarea engine-ului de vizualizare a sabloanelor EJS 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// [EN] Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
// [RO] Setare de middleware-uri pentru jurnalizare, parsare
// si management al sesiunii
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use( session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }) );


app.get('/',
  function(req, res) {
    userId = req.session.userId;
    theuser = null;
    if(Number.isInteger(req.session.userId)){
      theuser = db.users.findById(userId) 
    }
    res.render('home', { user: theuser });
  });


app.get('/login',
  function(req, res){
    res.render('login');
  }
);


app.post('/login',
  function(req, res) {
    console.log('Inside login')
    const user = basicPermit.check(req)
    if (user) {
      console.log("Avem user");      
      console.log("Username" + user.username);
      req.session.userId = user.id
      res.redirect('/profile');
    }
    else{
      console.log("Nu avem credentiale");
      res.redirect('/');
    }    
  }
);


app.get('/logout',
  function(req, res){    
    req.session.userId = ''
    res.redirect('/');
  });


app.get('/profile',  
  function(req, res){
    userId = req.session.userId;
    theuser = db.users.findById(userId) 
    res.render('profile', { user: theuser });
  });

  
app.listen(process.env.PORT || 3000)