var http = require('http');
var express = require('express');
var app = express();
const PORT = 3000;
var path = require('path');
var Datastore = require('nedb');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');

//-------------------------------------------------------------------------

var felgiDB = new Datastore({
	filename: './db/felgi.db',
	autoload: true,
});

var zawDB = new Datastore({
	filename: './db/zaw.db',
	autoload: true,
});

var ordersDB = new Datastore({
	filename: './db/orders.db',
	autoload: true,
});

var logDB = new Datastore({
	filename: './db/log.db',
	autoload: true,
});

//-------------------------------------------------------------------------

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.engine(
	'hbs',
	hbs({
		defaultLayout: 'main.hbs',
		helpers: {
			UP: function (title) {
				return title.toUpperCase();
			},
			price: function (title) {
				title = parseInt(title);
				return title.toFixed(2);
			},
		},
	})
);
app.set('view engine', 'hbs');

//-------------------------------------------------------------------------

app.get('/', function (req, res) {
	felgiDB
		.find({})
		.sort({ nazwa: 1 })
		.exec(function (err, docs1) {
			zawDB
				.find({})
				.sort({ nazwa: 1 })
				.exec(function (err, docs2) {
					res.render('index.hbs', {
						docs1: docs1,
						docs2: docs2,
						sel1: 'selected',
					});
				});
		});
});

app.get('/sort', function (req, res) {
	if (req.query.sorter == 10 || req.query.sorter == -10) {
		if (req.query.sorter == 10) {
			felgiDB
				.find({})
				.sort({ cena: 1 })
				.exec(function (err, docs1) {
					zawDB
						.find({})
						.sort({ cena: 1 })
						.exec(function (err, docs2) {
							res.render('index.hbs', {
								docs1: docs1,
								docs2: docs2,
								sel3: 'selected',
							});
						});
				});
		} else {
			felgiDB
				.find({})
				.sort({ cena: -1 })
				.exec(function (err, docs1) {
					zawDB
						.find({})
						.sort({ cena: -1 })
						.exec(function (err, docs2) {
							res.render('index.hbs', {
								docs1: docs1,
								docs2: docs2,
								sel4: 'selected',
							});
						});
				});
		}
	} else {
		if (req.query.sorter == 1) {
			felgiDB
				.find({})
				.sort({ nazwa: 1 })
				.exec(function (err, docs1) {
					zawDB
						.find({})
						.sort({ nazwa: 1 })
						.exec(function (err, docs2) {
							res.render('index.hbs', {
								docs1: docs1,
								docs2: docs2,
								sel1: 'selected',
							});
						});
				});
		} else {
			felgiDB
				.find({})
				.sort({ nazwa: -1 })
				.exec(function (err, docs1) {
					zawDB
						.find({})
						.sort({ nazwa: -1 })
						.exec(function (err, docs2) {
							res.render('index.hbs', {
								docs1: docs1,
								docs2: docs2,
								sel2: 'selected',
							});
						});
				});
		}
	}
});

app.get('/paginate', function (req, res) {
	var limit = Number(req.query.paginate);
	var limitt = limit / 2;

	if (limit == 0) {
		felgiDB
			.find({})
			.sort({ nazwa: 1 })
			.exec(function (err, docs1) {
				zawDB
					.find({})
					.sort({ nazwa: 1 })
					.exec(function (err, docs2) {
						res.render('index.hbs', {
							docs1: docs1,
							docs2: docs2,
							sel1: 'selected',
							sel5: 'selected',
						});
					});
			});
	} else if (limitt == 2) {
		felgiDB
			.find({})
			.limit(limitt)
			.exec(function (err, docs1) {
				zawDB
					.find({})
					.limit(limitt)
					.exec(function (err, docs2) {
						res.render('index.hbs', {
							docs1: docs1,
							docs2: docs2,
							sel1: 'selected',
							sel6: 'selected',
						});
					});
			});
	} else if (limitt == 4) {
		felgiDB
			.find({})
			.limit(limitt)
			.exec(function (err, docs1) {
				zawDB
					.find({})
					.limit(limitt)
					.exec(function (err, docs2) {
						res.render('index.hbs', {
							docs1: docs1,
							docs2: docs2,
							sel1: 'selected',
							sel7: 'selected',
						});
					});
			});
	} else {
		felgiDB
			.find({})
			.limit(limitt)
			.exec(function (err, docs1) {
				zawDB
					.find({})
					.limit(limitt)
					.exec(function (err, docs2) {
						res.render('index.hbs', {
							docs1: docs1,
							docs2: docs2,
							sel1: 'selected',
							sel8: 'selected',
						});
					});
			});
	}
});

app.get('/item/:id', function (req, res) {
	var id = req.params.id;
	felgiDB.findOne({ nazwa: id }, function (err, doc1) {
		if (doc1) {
			res.render('item.hbs', { doc: doc1 });
		} else {
			zawDB.findOne({ nazwa: id }, function (err, doc) {
				if (doc) {
					res.render('item.hbs', { doc: doc });
				} else {
					res.send('Nie ma takiego przedmiotu');
				}
			});
		}
	});
});

app.get('/search', function (req, res) {
	var szukaj = req.query.szukacz;
	var price = req.query.szukacz;
	price = Number(price);
	szukaj = szukaj.toLowerCase();
	felgiDB.find(
		{
			$or: [
				{ nazwa: req.query.szukacz },
				{ cena: price },
				{ kategoria: szukaj },
			],
		},
		function (err, docs1) {
			zawDB.find(
				{
					$or: [
						{ nazwa: req.query.szukacz },
						{ cena: price },
						{ kategoria: szukaj },
					],
				},
				function (err, docs2) {
					res.render('index.hbs', {
						docs1: docs1,
						docs2: docs2,
						sel1: 'selected',
					});
				}
			);
		}
	);
});

app.post('/login', function (req, res) {
	logDB.findOne({ login: req.body.login }, function (err, doc) {
		if (doc) {
			if (req.body.psw == doc.password) {
				console.log('Logged successfully');
				felgiDB.find({}, function (err, docs1) {
					zawDB.find({}, function (err, docs2) {
						res.render('modify.hbs', {
							layout: 'admin.hbs',
							user: doc.login,
							docs1: docs1,
							docs2: docs2,
						});
					});
				});
			} else {
				console.log('Login failure');
				res.render('error.hbs');
			}
		} else {
			console.log('Login failure');
			res.render('error.hbs');
		}
	});
});
app.get('/add', function (req, res) {
	res.render('add.hbs', { layout: 'admin.hbs', user: 'ADMIN' });
});

app.post('/addItem', function (req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		var oldpath = files.zdjecie.path;
		var nazwaimg = Date.parse(files.zdjecie.lastModifiedDate) + '.jpg';
		var newpath = __dirname + '/static/upload/' + nazwaimg;
		fs.rename(oldpath, newpath, function (err) {
			if (err) throw err;
		});
		var naz = fields.nazwa;
		var kat = fields.kategoria;
		var cen = fields.cena;
		cen = Number(cen);
		var doc = {
			nazwa: naz,
			kategoria: kat,
			cena: cen,
			img: 'upload/' + nazwaimg,
		};
		if (kat == 'felgi') {
			felgiDB.insert(doc, function (err, newDoc) {
				console.log('Dodano obiekt do felgiDB');
			});
		} else {
			zawDB.insert(doc, function (err, newDoc) {
				console.log('Dodano obiekt do zawDB');
			});
		}
		res.render('add.hbs', { layout: 'admin.hbs', user: 'ADMIN' });
	});
});

app.get('/modify', function (req, res) {
	felgiDB.find({}, function (err, docs1) {
		zawDB.find({}, function (err, docs2) {
			res.render('modify.hbs', {
				layout: 'admin.hbs',
				user: 'ADMIN',
				docs1: docs1,
				docs2: docs2,
			});
		});
	});
});

app.get('/removeItem', function (req, res) {
	felgiDB.findOne({ _id: req.query.usun_id }, function (err, doc) {
		if (doc == null) {
			zawDB.remove({ _id: req.query.usun_id }, {}, function (err, numRemoved) {
				console.log('Usunięto z zawDB');
				felgiDB.find({}, function (err, docs1) {
					zawDB.find({}, function (err, docs2) {
						res.render('modify.hbs', {
							layout: 'admin.hbs',
							user: 'ADMIN',
							docs1: docs1,
							docs2: docs2,
						});
					});
				});
			});
		} else {
			felgiDB.remove(
				{ _id: req.query.usun_id },
				{},
				function (err, numRemoved) {
					console.log('Usunięto z felgiDB');
					felgiDB.find({}, function (err, docs1) {
						zawDB.find({}, function (err, docs2) {
							res.render('modify.hbs', {
								layout: 'admin.hbs',
								user: 'ADMIN',
								docs1: docs1,
								docs2: docs2,
							});
						});
					});
				}
			);
		}
	});
});

app.get('/modItem', function (req, res) {
	felgiDB.findOne({ _id: req.query.mod_id }, function (err, doc) {
		if (doc == null) {
			zawDB.findOne({ _id: req.query.mod_id }, function (err, doc) {
				res.render('modItem.hbs', {
					layout: 'admin.hbs',
					user: 'ADMIN',
					doc,
					sel1: 'selected',
				});
			});
		} else {
			res.render('modItem.hbs', {
				layout: 'admin.hbs',
				user: 'ADMIN',
				doc,
				sel2: 'selected',
			});
		}
	});
});
app.post('/updateItem', function (req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		var oldpath = files.zdjecie.path;
		var nazwaimg = Date.parse(files.zdjecie.lastModifiedDate) + '.jpg';
		var newpath = __dirname + '/static/upload/' + nazwaimg;
		fs.rename(oldpath, newpath, function (err) {
			if (err) throw err;
		});
		var naz = fields.nazwa;
		var id = fields.id;
		var kat = fields.kategoria;
		var cen = fields.cena;
		cen = Number(cen);
		var doc = {
			nazwa: naz,
			kategoria: kat,
			cena: cen,
			img: 'upload/' + nazwaimg,
		};
		if (kat == 'felgi') {
			felgiDB.update({ _id: id }, doc, {}, function (err, numReplaced) {
				felgiDB.find({}, function (err, docs1) {
					zawDB.find({}, function (err, docs2) {
						res.render('modify.hbs', {
							layout: 'admin.hbs',
							user: 'ADMIN',
							docs1: docs1,
							docs2: docs2,
						});
					});
				});
			});
		} else {
			zawDB.update({ _id: id }, doc, {}, function (err, numReplaced) {
				felgiDB.find({}, function (err, docs1) {
					zawDB.find({}, function (err, docs2) {
						res.render('modify.hbs', {
							layout: 'admin.hbs',
							user: 'ADMIN',
							docs1: docs1,
							docs2: docs2,
						});
					});
				});
			});
		}
	});
});
//-------------------------------------------------------------------------

app.listen(PORT, function () {
	console.log('<-- Start strony -->');
});
