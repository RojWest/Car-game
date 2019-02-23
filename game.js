var game = new Game(380, 512, '#3D3D3D', 'img/asfalt.png');

//управление с клавиатуры:
var kb = game.KeyBoard();

//параметры первого объекта:
var rect = new game.Rect({
	x : 50, y : 25,
	width : 50,
	height : 30,
	//color : '#FF0000',
	texture : 'img/car.png'
})

//параметры второго объекта:
var rect2 = new game.Rect({
	x : 170, y : 25,
	width : 50,
	height : 30,
	//color : '#FFEF00',
	texture : 'img/car2.png'
})

// игровой цикл:
game.update = function () {

	//rect.x+= 0.05;

	if (kb.isDown('UP'))
		rect.y--;
	if (kb.isDown('DOWN'))
		rect.y++;
	if (kb.isDown('LEFT'))
		rect.x--;
	if (kb.isDown('RIGHT'))
		rect.x++;

	/*if (rect.intersect(rect2))
	console.log('Пересекается');*/

	//отрисовка первого объекта:
	rect.draw();
	//отрисовка второго объекта:
	rect2.draw();
};

game.start();