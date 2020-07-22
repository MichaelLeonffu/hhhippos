const app = new PIXI.Application({
	// backgroundColor: 0x1099bb,
	backgroundColor: 0x6ee0ff,
	height: 600 + 200,
	width: 800 + 0
});
document.body.appendChild(app.view);




// Initialize the pixi Graphics class
circle = new PIXI.Graphics();

circle.beginFill(0xe74c3c); // Red

// Draw a circle
circle.drawCircle(app.screen.width/2, app.screen.height/2, 400); // drawCircle(x, y, radius)
circle.endFill();

circle.beginFill(0x6ee0ff); // Blue
circle.drawCircle(app.screen.width/2, app.screen.height/2, 350);

// Add child
app.stage.addChild(circle);


// create a texture from an image path
const texture = PIXI.Texture.from('images/coin2.png');
const textureVector = PIXI.Texture.from('images/arrow.png');
const Ytext = PIXI.Texture.from('images/hippoY.png');
const Rtext = PIXI.Texture.from('images/hippoR.png');
const Gtext = PIXI.Texture.from('images/hippoG.png');
const Btext = PIXI.Texture.from('images/hippoB.png');

// Scale mode for pixelation
texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
textureVector.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

// Asume that height and width are the same
arrowOGSize = textureVector.frame.height;
arrowOGSize = 1600

// The size we want the texutre to be (assume square)
// Unit size
perPix = 50

// This is also the bigest size
arrowFinalSizeMax = perPix;
arrowFinalSizeMin = 10;

// In terms of scale
maxScale = arrowFinalSizeMax/arrowOGSize
minScale = arrowFinalSizeMin/arrowOGSize

// console.log("max", maxScale)
// console.log("min", minScale)
// console.log("og", arrowOGSize)

vectorField = []

// To know the center cordinate
halfi = (app.screen.width/perPix)/2 - 0.5
halfj = (app.screen.height/perPix)/2 - 0.5

for(let i = 0; i < app.screen.width/perPix; i++){
	vectorField[i] = []
	for(let j = 0; j < app.screen.height/perPix; j++){
		// vectorField[i][j] = createVector(i*perPix+50, j*perPix+50, Math.PI/8 *(i+j), 0.75);

		// Cords
		x = i*perPix+perPix/2;
		y = j*perPix+perPix/2;

		// Mag
		dx = x - app.screen.width/2;
		dy = y - app.screen.height/2;

		hyp = Math.sqrt(dx*dx+dy*dy);

		if(hyp < 340)
			mag = 0.25;
		else if(hyp < 400)
			mag = 1;
		else
			mag = 0;


		vectorField[i][j] = createVector(
			x,
			y,
			6*Math.PI/4 + Math.atan((j-halfj)/(i-halfi)) + ((i-halfi) < 0 ? Math.PI : 0),
			// (Math.abs((j-2.5)/6)+Math.abs((i-3.5)/8))
			// 0.25
			mag
		);
		// vectorField[i][j] = createVector(
		// 	i*perPix+50,
		// 	j*perPix+50,
		// 	Math.atan((j-2.5)/(i-3.5)) + ((i-3.5) < 0 ? Math.PI : 0),
		// 	(Math.abs((j-2.5)/6)+Math.abs((i-3.5)/8))
		// );
	}
}

// Make a zero two
const zeroTwo = new PIXI.Sprite(texture);

// Center and make it smaller
zeroTwo.scale.set(0.3);
zeroTwo.anchor.set(0.5);

// Place her in the center
zeroTwo.x = app.screen.width / 2 * 0.80;
zeroTwo.y = app.screen.height / 2;

zeroTwo.acceleration = new PIXI.Point(0);
zeroTwo.speed = new PIXI.Point(0);
zeroTwo.speed.y = 7
zeroTwo.speed.x = 5


//// Make hippos
const hippoY = new PIXI.Sprite(Ytext);
const hippoR = new PIXI.Sprite(Rtext);
const hippoG = new PIXI.Sprite(Gtext);
const hippoB = new PIXI.Sprite(Btext);


// Center and make it smaller
zeroTwo.scale.set(0.3);
zeroTwo.anchor.set(0.5);

hippoY.scale.set(0.5);
hippoR.scale.set(0.5);
hippoG.scale.set(0.5);
hippoB.scale.set(0.5);

// Place 
zeroTwo.x = app.screen.width / 2 * 0.85;
zeroTwo.y = app.screen.height / 2;

hippoY.x = app.screen.width / 2 * 0.85 + 330;
hippoY.y = app.screen.height / 2 - 60;

hippoR.x = app.screen.width / 2 * 0.85;
hippoR.y = app.screen.height / 2 - 510;

hippoG.x = app.screen.width / 2 * 0.85 - 450;
hippoG.y = app.screen.height / 2 - 60;

hippoB.x = app.screen.width / 2 * 0.85;
hippoB.y = app.screen.height / 2 + 270;


// Add it to the game
app.stage.addChild(zeroTwo);

app.stage.addChild(hippoY);
app.stage.addChild(hippoR);
app.stage.addChild(hippoG);
app.stage.addChild(hippoB);


///////
//Capture the keyboard arrow keys

  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  //Left arrow key `press` method
  left.press = function () {
	hippoG.x = app.screen.width / 2 * 0.85 - 400;
	hippoG.y = app.screen.height / 2 - 60;
  };

  //Left arrow key `release` method
  left.release = function () {
	hippoG.x = app.screen.width / 2 * 0.85 - 450;
	hippoG.y = app.screen.height / 2 - 60;
  };

  //Up
  up.press = function () {
    hippoR.x = app.screen.width / 2 * 0.85;
	hippoR.y = app.screen.height / 2 - 460;
  };
  up.release = function () {
    hippoR.x = app.screen.width / 2 * 0.85;
	hippoR.y = app.screen.height / 2 - 510;
  };

  //Right
  right.press = function () {
    hippoY.x = app.screen.width / 2 * 0.85 + 280;
	hippoY.y = app.screen.height / 2 - 60;
  };
  right.release = function () {
    hippoY.x = app.screen.width / 2 * 0.85 + 330;
	hippoY.y = app.screen.height / 2 - 60;
  };

  //Down
  down.press = function () {
    hippoB.x = app.screen.width / 2 * 0.85;
	hippoB.y = app.screen.height / 2 + 220;
  };
  down.release = function () {
    hippoB.x = app.screen.width / 2 * 0.85;
	hippoB.y = app.screen.height / 2 + 270;
  };

//////

console.log(vectorField.length)
console.log(vectorField[0].length)

vfwidth = vectorField.length
vfheight = vectorField[0].length

// Ticks
app.ticker.add((delta) => {


	// delta *= 1

	// Deterministic:
	delta = 1


	// Check for new acceleration in vector field

	x = Math.floor(zeroTwo.x/perPix)
	y = Math.floor(zeroTwo.y/perPix)

	// Always posative (0 to 1)
	dx = zeroTwo.x/perPix - x;
	dy = zeroTwo.y/perPix - y;
	
	////when BUTTON DOWN FOR HIPPOS
	//adjust by 50px
	/*
	hippoY.x = app.screen.width / 2 * 0.85 + 280;
	hippoY.y = app.screen.height / 2 - 60;

	hippoR.x = app.screen.width / 2 * 0.85;
	hippoR.y = app.screen.height / 2 - 460;

	hippoG.x = app.screen.width / 2 * 0.85 - 400;
	hippoG.y = app.screen.height / 2 - 60;

	hippoB.x = app.screen.width / 2 * 0.85;
	hippoB.y = app.screen.height / 2 + 220;
	*/

	vect = vectorField[x][y]
	// console.log("testing", vect.myScale)
	// console.log("test", vect.rotation)

	// Get 4 near nodes
	vect1 = vectorField[(x+0)%(vfwidth-1)][(y+0)%(vfheight-1)];
	vect2 = vectorField[(x+1)%(vfwidth-1)][(y+0)%(vfheight-1)];
	vect3 = vectorField[(x+0)%(vfwidth-1)][(y+1)%(vfheight-1)];
	vect4 = vectorField[(x+1)%(vfwidth-1)][(y+1)%(vfheight-1)];

	// Copy their values
	mag1 = vect1.myMag;
	mag2 = vect2.myMag;
	mag3 = vect3.myMag;
	mag4 = vect4.myMag;

	// Weigh their values
	mag1 *= (1-dx + 1-dy)/2;
	mag2 *= (  dx + 1-dy)/2;
	mag3 *= (1-dx +   dy)/2;
	mag4 *= (  dx +   dy)/2;

	// Vector addition
	magx = Math.cos(vect1.rotation - Math.PI/2) * mag1 +
		Math.cos(vect2.rotation - Math.PI/2) * mag2 +
		Math.cos(vect3.rotation - Math.PI/2) * mag3 +
		Math.cos(vect4.rotation - Math.PI/2) * mag4;

	magy = Math.sin(vect1.rotation - Math.PI/2) * mag1 +
		Math.sin(vect2.rotation - Math.PI/2) * mag2 +
		Math.sin(vect3.rotation - Math.PI/2) * mag3 +
		Math.sin(vect4.rotation - Math.PI/2) * mag4;


	mag = vect.myMag
	// mag = Math.sqrt(magx*magx+magy*magy);
	rot = Math.PI/2 +
		Math.atan(magy/magx) +
		(magx < 0 ? Math.PI : 0);

	zeroTwo.acceleration.x = Math.cos(rot - Math.PI/2) * mag
	zeroTwo.acceleration.y = Math.sin(rot - Math.PI/2) * mag

	// Fix the edge cases
	// if(x+1 >= vfwidth)
		zeroTwo.acceleration.x = Math.cos(vect.rotation - Math.PI/2) * mag //* 0.1
	// if(y+1 >= vfheight)
		zeroTwo.acceleration.y = Math.sin(vect.rotation - Math.PI/2) * mag //* 0.1

	zeroTwo.speed.r = Math.sqrt(zeroTwo.speed.x*zeroTwo.speed.x+zeroTwo.speed.y*zeroTwo.speed.y);


	// Air resistance only if above certain speed
	airResist = 0.005
	if(zeroTwo.speed.r >= 0.1 && false){
		zeroTwo.acceleration.x -= Math.cos(zeroTwo.rotation - Math.PI/2) * airResist * zeroTwo.speed.r;
		zeroTwo.acceleration.y -= Math.sin(zeroTwo.rotation - Math.PI/2) * airResist * zeroTwo.speed.r;
	}


	// zeroTwo.acceleration.x = 0.02
	// zeroTwo.acceleration.y = 0.02

	// Update speed
	zeroTwo.speed.x += zeroTwo.acceleration.x * delta
	zeroTwo.speed.y += zeroTwo.acceleration.y * delta

	// Speed limit
	speedLimit = 10
	zeroTwo.speed.x = Math.sign(zeroTwo.speed.x) * Math.min(speedLimit, Math.abs(zeroTwo.speed.x))
	zeroTwo.speed.y = Math.sign(zeroTwo.speed.y) * Math.min(speedLimit, Math.abs(zeroTwo.speed.y))

	// Speed minimun (if too slow then stop)
	if(zeroTwo.speed.r < 0.01){
		console.log("stoped")
		zeroTwo.speed.x = 0
		zeroTwo.speed.y = 0
	}

	// Update angle with speed
	newRot =
		Math.PI/2 +
		Math.atan(zeroTwo.speed.y/zeroTwo.speed.x) +
		(zeroTwo.speed.x < 0 ? Math.PI : 0);

	// If the speed is 0 then newRot is NaN
	// We want to keep the pervious direction
	if(! isNaN(newRot))
		zeroTwo.rotation = newRot

	// Update position
	zeroTwo.x += zeroTwo.speed.x * delta
	zeroTwo.y += zeroTwo.speed.y * delta

	// Wrap
	// zeroTwo.x = zeroTwo.x % app.screen.width
	// zeroTwo.y = zeroTwo.y % app.screen.height
	// zeroTwo.x = zeroTwo.x < 0 ? zeroTwo.x + app.screen.width : zeroTwo.x
	// zeroTwo.y = zeroTwo.y < 0 ? zeroTwo.y + app.screen.height : zeroTwo.y

	// Bounce like light
	if(zeroTwo.x < 0 || zeroTwo.x > app.screen.width)
		zeroTwo.speed.x *= -0.5;
	if(zeroTwo.y < 0 || zeroTwo.y > app.screen.height)
		zeroTwo.speed.y *= -0.5;

	// Limit position
	zeroTwo.x = Math.min(zeroTwo.x, app.screen.width-1);
	zeroTwo.x = Math.max(zeroTwo.x, 1);
	zeroTwo.y = Math.min(zeroTwo.y, app.screen.height-1);
	zeroTwo.y = Math.max(zeroTwo.y, 1);

})

function createVector(x, y, d, m) {
	// Direction(rad), Magnatude(%)

	// Creating a Vector (arrow sprite)
	const vect = new PIXI.Sprite(textureVector);

	// enable the vect to be interactive... this will allow it to respond to mouse and touch events
	vect.interactive = true;

	// this button mode will mean the hand cursor appears when you roll over the vect with your mouse
	vect.buttonMode = true;

	// center the vect's anchor point
	vect.anchor.set(0.5);

	// set the d and m
	vect.myMag = m;
	vect.scale.set((maxScale - minScale) * m + minScale);
	vect.rotation = d;


	// setup events for mouse + touch using
	// the pointer events
	vect
		.on('pointerdown', onDragStart)
		.on('pointerup', onDragEnd)
		.on('pointerupoutside', onDragEnd)
		.on('pointermove', onDragMove);

	// move the sprite to its designated position
	vect.x = x;
	vect.y = y;

	// add it to the stage
	app.stage.addChild(vect);

	// This keeps track of all the vectors
	return vect;
}

function onDragStart(event) {
	// store a reference to the data
	// the reason for this is because of multitouch
	// we want to track the movement of this particular touch
	this.data = event.data;
	this.alpha = 0.5;
	this.dragging = true;
}

function onDragEnd() {
	this.alpha = 1;
	this.dragging = false;
	// set the interaction data to null
	this.data = null;
}

function onDragMove() {
	if (this.dragging) {
		const newPosition = this.data.getLocalPosition(this.parent);

		// Delta
		dx = newPosition.x - this.x;
		dy = newPosition.y - this.y;

		// Dicrection (rotation)
		this.rotation =
			Math.PI/2 +					// Rotate it
			Math.atan(dy/dx) +			// Change the angle accordingly
			(dx < 0 ? Math.PI : 0);		// If it is the special case fix it

		// Magnitude (distance)
		hyp = Math.sqrt(dx*dx+dy*dy);

		// Calcuate the Percent magnitude
		newScale = (hyp - arrowFinalSizeMin/2)/(arrowFinalSizeMax - arrowFinalSizeMin/2)

		newScale = Math.min(newScale, 1);	// 100%
		newScale = Math.max(newScale, 0);	// 0%

		this.myMag = newScale;
		// console.log("SET to:", (maxScale - minScale) * newScale + minScale)
		this.scale.set((maxScale - minScale) * newScale + minScale);

	}
}


//KEYBOARD FUNCTIONS
//The `keyboard` helper function
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener("keydown", key.downHandler.bind(key), false);
  window.addEventListener("keyup", key.upHandler.bind(key), false);

  //Return the key object
  return key;
}
