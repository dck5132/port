var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var api_key = 'key-b1a2987e095ffec2cb208ddd47f1519e';
var domain = 'sandbox66bc196e719b40bf810efd8d43c1b737.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


/* GET home page. */
router.get('/', function(req, res, next) {
  
  
  var data = req.app.get('appData');
  var modalImg = [];
  var modalAlt = [];
  var modalTitle = [];
  var modalText = [];
  var modalDate = [];
  var modalClient = [];
  var modalService = [];
  var about = data.about;
  var skills = data.skills;
  var item = "https://cyrils-web-dev.herokuapp.com/";
  data.modals.forEach(function(item) {
    modalImg = modalImg.concat(item.images);
    modalAlt = modalAlt.concat(item.alt);
    modalText = modalText.concat(item.modal_inside);
    modalDate = modalDate.concat(item.modal_date);
    modalClient = modalClient.concat(item.modal_client);
    modalService = modalService.concat(item.modal_service);
    modalTitle = modalTitle.concat(item.modal_title);
  });
  res.render('index', { 
      title: "Cyril: Web Developer",
      navi: "Cyril",
      skills: skills,
      portf: "portfolioModal",
      images: modalImg,
      alt: modalAlt,
      titles: modalTitle,
      modal: modalText,
      date: modalDate,
      client: modalClient,
      service: modalService,
      about: about,
      itemtype: item
  });
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded(
  { extended: false}
  ));
router.post('/', function(req, res, next){
  var ref = req.headers.referer;
  
  if(ref == 'https://cyrils-web-dev.herokuapp.com/') {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;
    var to = 'dck5132@gmail.com';
    
    var data = {
    from: email,
    to: to,
    subject: name,
    text: message + " " + phone
    };
   
    mailgun.messages().send(data, function (error, body) {
      if(!error) {
        console.log(body);
        res.sendStatus(200);
      }
      else {
        console.log(error);
        res.sendStatus(404);
      }
    });
    
  }

});
router.get('/robots.txt', function(req, res, next) {
  res.render('./partials/templates/robots');
});
router.get('/sitemap.xml', function(req, res, next) {
  res.render('./partials/templates/sitemap');
});
module.exports = router;