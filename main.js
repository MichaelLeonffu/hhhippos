const app = new PIXI.Application({
	// backgroundColor: 0x1099bb,
	backgroundColor: 0x6ee0ff,
	height: 600 + 200,
	width: 800 + 0
});
document.body.appendChild(app.view);




// Initialize the pixi Graphics class
circle = new PIXI.Graphics();

// Draw a circle
circle.beginFill(0xd6d6d6); // White
circle.drawCircle(app.screen.width/2, app.screen.height/2, 1300); // drawCircle(x, y, radius)
circle.endFill();

// Draw a circle
circle.beginFill(0xe74c3c); // Red
circle.drawCircle(app.screen.width/2, app.screen.height/2, 400); // drawCircle(x, y, radius)
circle.endFill();

// Draw a circle
circle.beginFill(0x6ee0ff); // Blue
circle.drawCircle(app.screen.width/2, app.screen.height/2, 350);
circle.endFill();

// Add child
app.stage.addChild(circle);


// create a texture from an image path
const texture = PIXI.Texture.from('images/coin2.png');
const textureVector = PIXI.Texture.from('images/arrow.png');


// Scale mode for pixelation
texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
textureVector.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

// Assume that height and width are the same
arrowOGSize = textureVector.frame.height;
arrowOGSize = 1600

// The size we want the texture to be (assume square)
// Unit size
perPix = 50

// This is also the biggest size
arrowFinalSizeMax = perPix;
arrowFinalSizeMin = 10;

// In terms of scale
maxScale = arrowFinalSizeMax/arrowOGSize
minScale = arrowFinalSizeMin/arrowOGSize

// console.log("max", maxScale)
// console.log("min", minScale)
// console.log("og", arrowOGSize)

vectorField = []

// To know the center coordinate
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

		// Starting form the inner most
		if(hyp < 340 + 10)
			mag = 0.6;
		else if(hyp < 400)
			mag = 0.25*0;
		else
			mag = 0.25;

		mag = 0.6


		vectorField[i][j] = createVector(
			x,
			y,
			//6*Math.PI
			// Math.PI/2 + Math.atan((j-halfj)/(i-halfi)) + ((i-halfi) < 0 ? Math.PI : 0),
			Math.PI/2 + Math.atan2(j-halfj, i-halfi),
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

var seed = 1;
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

coin = [];
for(let i=0;i<20;i++){
	
	// Make a coin
	coin[i] = new PIXI.Sprite(texture);

	// Center and make it smaller
	coin[i].scale.set(0.3);
	coin[i].anchor.set(0.5);

	// Place
	coin[i].x = app.screen.width / 2 * (random() * 0.6 - 0.3) + app.screen.width / 2;
	coin[i].y = app.screen.height / 2 * (random() * 0.6 - 0.3) + app.screen.height / 2;

	coin[i].acceleration = new PIXI.Point(0);
	coin[i].speed = new PIXI.Point(0);
	coin[i].speed.y = random() * 4 - 2; 
	coin[i].speed.x = random() * 4 - 2;

	// Center and make it smaller
	coin[i].scale.set(0.3);
	coin[i].anchor.set(0.5);

	// Add it to the game
	app.stage.addChild(coin[i]);

}
bump = new Bump(PIXI);
tink = new Tink(PIXI,app.view);
const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});

text  = []
score = [0,0,0,0];
limit = [6,6,2,6];
textX = [   0,-370,  0,370];
textY = [-370,   0,370,  0];
//// Make hippos
hippoText = [];
hippo = [];
delay = [30,30,30,30];
timer = [0,0,0,0];
//		   Top Red   Left G  Bot Blu Right Yel
startX 	= [0		,-450	,0		,330	];
startY 	= [-450-60	,0-60	,330-60	,0-60	];
endX 	= [0		,-450+50,0		,330-50	];
endY 	= [-450-10	,0-60	,330-110,0-60	];
key = [];
keyCode = [38,37,40,39];
pressers = []
for(let k = 0; k<4; k++){
	// hippo texture
	hippoText[k] = PIXI.Texture.from('images/hippo'+k+'.png');
	// make hippo sprite
	hippo[k] = new PIXI.Sprite(hippoText[k]);
	hippo[k].visible = true
	// center and make it smaller
	hippo[k].scale.set(0.5);
	// hippo starting X and Y position with offset
	hippo[k].x = app.screen.width / 2 * 0.85 + startX[k];
	hippo[k].y = app.screen.height / 2 + startY[k];
	// add hippo to stage
	app.stage.addChild(hippo[k]);
	tink.makeInteractive(hippo[k]);


	//up 0 left 1 down 2 right 3
	key[k] = keyboard(keyCode[k]);

	function presser() {
		if(timer[k] < delay[k]) return;
		timer[k] = 0;
		hippo[k].x = app.screen.width / 2 * 0.85 + endX[k];
		hippo[k].y = app.screen.height / 2 + endY[k];
	};

	// Add the presser to the array
	pressers[k] = presser

	//arrow key `press` method (KEYBOARD)
	key[k].press = presser

	// //arrow key `release` method
	// key[k].release = function () {
	// 	hippo[k].x = app.screen.width / 2 * 0.85 + startX[k];
	// 	hippo[k].y = app.screen.height / 2 + startY[k];
	// };

	//arrow key `press` method (MOUSE)
	hippo[k].press = function () {
		if(timer[k] < delay[k]) return;
		timer[k] = 0;
		hippo[k].x = app.screen.width / 2 * 0.85 + endX[k];
		hippo[k].y = app.screen.height / 2 + endY[k];
	};

	// //arrow key `release` method
	// hippo[k].release = function () {
	// 	hippo[k].x = app.screen.width / 2 * 0.85 + startX[k];
	// 	hippo[k].y = app.screen.height / 2 + startY[k];
	// };

	text[k] = new PIXI.Text(""+score[k], style);
	text[k].x = textX[k] + 385; // Adding initial offset
	text[k].y = textY[k] + 375;
	app.stage.addChild(text[k]);
}


console.log(vectorField.length)
console.log(vectorField[0].length)

vfwidth = vectorField.length
vfheight = vectorField[0].length

count = 0

// Ticks
app.ticker.add((delta) => {


	// delta *= 1

	// Deterministic:
	delta = 1

	if(count > 100){
		pressers[1]()
		count = 0
	}else{
		count++
	}

	for(let i=0;i<20;i++){
		// Check for new acceleration in vector field

		x = Math.floor(coin[i].x/perPix)
		y = Math.floor(coin[i].y/perPix)

		// Always posative (0 to 1)
		dx = coin[i].x/perPix - x;
		dy = coin[i].y/perPix - y;


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

		coin[i].acceleration.x = Math.cos(rot - Math.PI/2) * mag
		coin[i].acceleration.y = Math.sin(rot - Math.PI/2) * mag

		// Fix the edge cases
		// if(x+1 >= vfwidth)
			coin[i].acceleration.x = Math.cos(vect.rotation - Math.PI/2) * mag //* 0.1
		// if(y+1 >= vfheight)
			coin[i].acceleration.y = Math.sin(vect.rotation - Math.PI/2) * mag //* 0.1

		coin[i].speed.r = Math.sqrt(coin[i].speed.x*coin[i].speed.x+coin[i].speed.y*coin[i].speed.y);


		// Air resistance only if above certain speed
		airResist = 0.005
		if(coin[i].speed.r >= 0.1 && false){
			coin[i].acceleration.x -= Math.cos(coin[i].rotation - Math.PI/2) * airResist * coin[i].speed.r;
			coin[i].acceleration.y -= Math.sin(coin[i].rotation - Math.PI/2) * airResist * coin[i].speed.r;
		}


		// coin[i].acceleration.x = 0.02
		// coin[i].acceleration.y = 0.02

		// Bouncing off the walls if the coin is on the wall

		xFCenter = coin[i].x - app.screen.width/2;
		yFCenter = coin[i].y - app.screen.height/2;
		coinFromCenter = Math.sqrt(xFCenter*xFCenter+yFCenter*yFCenter);

		if(coinFromCenter > 341 && coinFromCenter < 340 + 399){
			// Imagine the tangent angle of the wall to be 'a'
			// And the angle of the coin to be 'b'
			// Then we find the new 'b' angle (c) to be 2a+pi-b

			// To find 'a' we first find the position of where the coin is
			// to find 'b' we have the speed of the coin

			a = Math.atan2(yFCenter, xFCenter);
			b = Math.atan2(coin[i].speed.y, coin[i].speed.x);

			c = 2*a + Math.PI - b;

			// Given C we can find the corresponding component vectors
			reduction = 0.8
			coin[i].speed.x = Math.cos(c) * coin[i].speed.r * reduction;
			coin[i].speed.y = Math.sin(c) * coin[i].speed.r * reduction;

			// Fix? bring it slightly closer to the center
			// xFCenter = Math.sign(xFCenter)*(Math.abs(xFCenter) - 1)
			// yFCenter = Math.sign(yFCenter)*(Math.abs(yFCenter) - 1)

			// Bring it inside of the circle no matter where it is
			// since a is the angle from the center of the circle
			// Generate the x y pair that would be at the edge of the circle
			xFCenter = Math.cos(a) * 340
			yFCenter = Math.sin(a) * 340



			coin[i].x = xFCenter + app.screen.width/2;
			coin[i].y = yFCenter + app.screen.height/2;

		}else{
			// Update speed
			coin[i].speed.x += coin[i].acceleration.x * delta
			coin[i].speed.y += coin[i].acceleration.y * delta
		}

		// Speed limit
		speedLimit = 10
		coin[i].speed.x = Math.sign(coin[i].speed.x) * Math.min(speedLimit, Math.abs(coin[i].speed.x))
		coin[i].speed.y = Math.sign(coin[i].speed.y) * Math.min(speedLimit, Math.abs(coin[i].speed.y))

		// Speed minimum (if too slow then stop)
		// DISABLED
		// coin[i].speed.r = Math.sqrt(coin[i].speed.x*coin[i].speed.x+coin[i].speed.y*coin[i].speed.y);
		if(false && coin[i].speed.r < 0.01){
			console.log("stopped")
			coin[i].speed.x = 0
			coin[i].speed.y = 0
		}

		// Update angle with speed
		newRot =
			Math.PI/2 +
			Math.atan(coin[i].speed.y/coin[i].speed.x) +
			(coin[i].speed.x < 0 ? Math.PI : 0);

		// If the speed is 0 then newRot is NaN
		// We want to keep the previous direction
		if(! isNaN(newRot))
			coin[i].rotation = newRot

		// Update position if significant
		coin[i].x += coin[i].speed.x * delta
		coin[i].y += coin[i].speed.y * delta

		// Wrap
		// coin[i].x = coin[i].x % app.screen.width
		// coin[i].y = coin[i].y % app.screen.height
		// coin[i].x = coin[i].x < 0 ? coin[i].x + app.screen.width : coin[i].x
		// coin[i].y = coin[i].y < 0 ? coin[i].y + app.screen.height : coin[i].y

		// Bounce like light
		if(coin[i].x < 0 || coin[i].x > app.screen.width)
			coin[i].speed.x *= -0.5;
		if(coin[i].y < 0 || coin[i].y > app.screen.height)
			coin[i].speed.y *= -0.5;

		// Limit position
		coin[i].x = Math.min(coin[i].x, app.screen.width-1);
		coin[i].x = Math.max(coin[i].x, 1);
		coin[i].y = Math.min(coin[i].y, app.screen.height-1);
		coin[i].y = Math.max(coin[i].y, 1);
	
		// for each hippo
		for(let k = 0; k < 4;k++){
			if (i == 0) timer[k]++;
			if (timer[k] == 5){
				hippo[k].x = app.screen.width / 2 * 0.85 + startX[k];
				hippo[k].y = app.screen.height / 2 + startY[k];
			}
			if(bump.hitTestRectangle(hippo[k],coin[i])){
				if (coin[i].visible && score[k]<limit[k] && timer[k]<5){
					coin[i].visible = false;
					text[k].text = "" + ++score[k];
				}
			}
		}
	}
	tink.update();
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
			Math.atan2(dy, dx);			// Change the angle accordingly

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
