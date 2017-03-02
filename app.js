var koa = require('koa');
var route = require('koa-route');
var app = koa();

var views = require('co-views')
var render = views('./view', {
  map: { html: 'ejs' }
});
var koa_static = require('koa-static-server');
var service = require('./service/webAppService.js');
app.use(koa_static({
	rootDir: './static/',
	rootPath: '/static/',
	maxage: 0
}));



app.use(route.get('/', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('index');
}));


 var querystring = require('querystring')
app.use(route.get('/book', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	this.body = yield render('book',{nav:'书籍详情',bookId:bookId});
}));


app.use(route.get('/reader', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('reader');
}));

app.use(route.get('/ajax/index', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_index_data();
}));



var querystring = require('querystring');
app.use(route.get('/ajax/book', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if(!id){
	   id = "";
	}
	this.body = service.get_book_data(id);
}));

app.use(route.get('/ajax/chapter', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_chapter_data();
}));

app.use(route.get('/ajax/chapter_data', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if(!id){
	   id = "";
	}
	this.body = service.get_chapter_content_data(id);
}));



app.listen(3000);
