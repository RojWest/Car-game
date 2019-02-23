function Game (WIDTH, HEIGHT, BCLR,	IMG) {
	'use strict';


	//канвас:
	var D = document;

	var cnv = D.createElement('canvas');
	cnv.style.position = 'fixed';
	cnv.style.left = 0;
	cnv.style.top = 0;
	cnv.style.width = WIDTH + 'px';
	cnv.style.height = HEIGHT + 'px';

	if (IMG) {
		cnv.style.background = 'url('+IMG+') no-repeat';
		cnv.style.backgroundPosition = 'center';
		cnv.style.backgroundSize = 'cover';
		// cnv.style.
	}


	cnv.style.backgroundColor = BCLR;

	D.body.appendChild(cnv);

	var ctx = cnv.getContext('2d');


	var _Game = this;

	this.update = function () {
		console.log('Update не определена')
	};

	var engine = function () {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		_Game.update();
		requestAnimationFrame(engine);
	};

	this.start = function () {
		engine();
	};

	var drawRect = function (x, y, w, h, c) {
		ctx.fillStyle = c;
		ctx.fillRect(x, y, w, h);
	};

	// тектурируем игровые объекты:
	var imgList = {};

	var loadImage = function (file) {
		if (imgList[file]) return;

		var image = D.createElement('img');
		imgList[file] = {
			loaded : false,
			image : image
		};

		var _image = imgList[file];

		image.onload = function () {
			_image.loaded = true;
		};

		image.src = file;
	};

	var drawImage = function (x, y, w, h, file) {

		if (!imgList[file]) return;
		if (!imgList[file].loaded) return;

		ctx.drawImage(imgList[file].image, x, y, w, h);

	};


	//характеристики объекта:
	this.Rect = function (param) {
		
		this.x = param.x;
		this.y = param.y;
		this.width = param.width;
		this.height = param.height;
		this.color = param.color;
		this.texture = false;

		if (param.texture) {
			this.texture = param.texture;
			loadImage(param.texture);
		};

	};

	//функция отрисовки объектов на экране:
	this.Rect.prototype = {
		draw : function() {

			if (this.color)
			drawRect(this.x, this.y, this.width, this.height, this.color);

			if (this.texture)
			drawImage(this.x, this.y, this.width, this.height, this.texture);

		/*ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);*/
		},

		intersect : function (obj) {

			return !(this.x+this.width < obj.x || this.y+this.y < obj.y || this.x > obj.x+obj.width || this.y > obj.y+obj.height);
		}
	};


	// клавиатура:
	var kbInited = false;
	this.KeyBoard = function () {
		if (kbInited) return;
		kbInited = true;

		var keys = {
			'UP' : 87,
			'DOWN' : 83,
			'LEFT' : 65,
			'RIGHT' : 68,
		};

		var pressedKeys = {};

		window.addEventListener('keydown', function (e) {
		 pressedKeys[e.keyCode] = true;
		});
		window.addEventListener('keyup', function (e) {
		 pressedKeys[e.keyCode] = false;
		});

/*		window.addEventListener('keyupleft', function (e) {
		 pressedKeys[e.keyCode] = true;
		});
		window.addEventListener('keyright', function (e) {
		 pressedKeys[e.keyCode] = false;
		});*/

		var kb = {
			isDown : function (keyName) {
				return !!pressedKeys[keys[keyName]];
			}
		};

		return kb;
	};


}