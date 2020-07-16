const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// create a texture from an image path
const texture = PIXI.Texture.from('images/zerotwosmall.png');
const textureVector = PIXI.Texture.from('images/arrow.png');

// Scale mode for pixelation
texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
textureVector.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;


baseScale = 0.05
minScale = 0.03
maxScale = 0.08

perPix = 100
baseScale = 0.05

vectorField = []

for(let i = 0; i < app.screen.width/perPix; i++){
	vectorField[i] = []
	for(let j = 0; j < app.screen.height/perPix; j++){
		// vectorField[i][j] = createVector(i*perPix+50, j*perPix+50, Math.PI/8 *(i+j), 0.75);
		vectorField[i][j] = createVector(
			i*perPix+50,
			j*perPix+50,
			6*Math.PI/4 + Math.atan((j-2.5)/(i-3.5)) + ((i-3.5) < 0 ? Math.PI : 0),
			// (Math.abs((j-2.5)/6)+Math.abs((i-3.5)/8))
			0.75
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


// Add it to the game
app.stage.addChild(zeroTwo);

console.log(vectorField.length)
console.log(vectorField[0].length)

counter = 0
slow = 1

// Ticks
app.ticker.add((delta) => {

	// return

	counter++;
	if(false || counter < slow)
		return
	
	counter = 0

	// delta *= 1

	// Deterministic:
	delta = 1


	// Check for new acceleration in vector field

	x = Math.floor(zeroTwo.x/100)
	y = Math.floor(zeroTwo.y/100)

	// Always posative
	dx = zeroTwo.x/100 - x;
	dy = zeroTwo.y/100 - y;

	// console.log(zeroTwo.x, zeroTwo.y)
	// console.log(x, y)

	vect = vectorField[x][y]
	// console.log("testing", vect.myScale)
	// console.log("test", vect.rotation)

	vect1 = vectorField[(x+0)%7][(y+0)%5];
	vect2 = vectorField[(x+1)%7][(y+0)%5];
	vect3 = vectorField[(x+0)%7][(y+1)%5];
	vect4 = vectorField[(x+1)%7][(y+1)%5];

	mag1 = (vect1.myScale - minScale)/(maxScale - minScale);
	mag2 = (vect2.myScale - minScale)/(maxScale - minScale);
	mag3 = (vect3.myScale - minScale)/(maxScale - minScale);
	mag4 = (vect4.myScale - minScale)/(maxScale - minScale);

	mag1 *= (1-dx + 1-dy)/2;
	mag2 *= (  dx + 1-dy)/2;
	mag3 *= (1-dx +   dy)/2;
	mag4 *= (  dx +   dy)/2;


	magx = Math.cos(vect1.rotation - Math.PI/2) * mag1 +
		Math.cos(vect2.rotation - Math.PI/2) * mag2 +
		Math.cos(vect3.rotation - Math.PI/2) * mag3 +
		Math.cos(vect4.rotation - Math.PI/2) * mag4;

	magy = Math.sin(vect1.rotation - Math.PI/2) * mag1 +
		Math.sin(vect2.rotation - Math.PI/2) * mag2 +
		Math.sin(vect3.rotation - Math.PI/2) * mag3 +
		Math.sin(vect4.rotation - Math.PI/2) * mag4;


	mag = (vect.myScale - minScale)/(maxScale - minScale)
	// mag = Math.sqrt(magx*magx+magy*magy);
	rot = Math.PI/2 +
		Math.atan(magy/magx) +
		(magx < 0 ? Math.PI : 0);

	zeroTwo.acceleration.x = Math.cos(rot - Math.PI/2) * mag
	zeroTwo.acceleration.y = Math.sin(rot - Math.PI/2) * mag

	// Fix the edge cases
	// if(x+1 >= 8)
		zeroTwo.acceleration.x = Math.cos(vect.rotation - Math.PI/2) * mag //* 0.1
	// if(y+1 >= 6)
		zeroTwo.acceleration.y = Math.sin(vect.rotation - Math.PI/2) * mag //* 0.1
	

	// zeroTwo.acceleration.x = 0.02
	// zeroTwo.acceleration.y = 0.02

	// Update speed
	speedLimit = 10
	zeroTwo.speed.x += zeroTwo.acceleration.x * delta
	zeroTwo.speed.y += zeroTwo.acceleration.y * delta


	zeroTwo.speed.x = Math.sign(zeroTwo.speed.x) * Math.min(speedLimit, Math.abs(zeroTwo.speed.x))
	zeroTwo.speed.y = Math.sign(zeroTwo.speed.y) * Math.min(speedLimit, Math.abs(zeroTwo.speed.y))

	// Update angle with speed
	zeroTwo.rotation =
		Math.PI/2 +
		Math.atan(zeroTwo.speed.y/zeroTwo.speed.x) +
		(zeroTwo.speed.x < 0 ? Math.PI : 0);

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
	vect.scale.set((maxScale - minScale) * m);
	vect.myScale = (maxScale - minScale) * m
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
		distanceInPixFromCenter = 25;
		hyp = Math.sqrt(dx*dx+dy*dy);

		offset = (hyp - distanceInPixFromCenter)/500

		newScale = offset + baseScale;
		newScale = Math.min(newScale, maxScale);
		newScale = Math.max(newScale, minScale);

		this.myScale = newScale
		this.scale.set(newScale)

	}
}
