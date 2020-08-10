const app = new PIXI.Application({
	// backgroundColor: 0x1099bb,
	backgroundColor: 0x6ee0ff,
	height: 600 + 200,
	width: 800 + 0
});
document.body.appendChild(app.view);

// Libraries
bump = new Bump(PIXI);
tink = new Tink(PIXI,app.view);

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

startX 	= [0		,-400	,0		,400	];
startY 	= [-400		,0		,400	,0		];

// Show locations
if(false)
for(let i = 0; i < 4; i++){
	// Draw a circle
	circle.beginFill(0xbb33bb); // magenta (spalsh)
	circle.drawCircle(app.screen.width / 2 + startX[i], app.screen.height / 2 + startY[i], 350);
	circle.endFill();

	// Draw a circle
	circle.beginFill(0xffbbff); // pink (detect range)
	circle.drawCircle(app.screen.width / 2 + startX[i], app.screen.height / 2 + startY[i], 200);
	circle.endFill();
}

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
		// if(hyp < 340 + 30)
		// 	mag = -0.005*0;
		// else if(hyp < 400)
		// 	mag = 0.25;
		// else
		// 	mag = 0.25;

		mag = -0.01;


		ccwSpin 	= 0 			// 0
		toCenter 	= Math.PI/2 	// 90
		cwSpin 		= Math.PI 		// 180
		toOut 		= 3*Math.PI/2 	// 270

		spinAdj = toCenter


		vectorField[i][j] = createVector(
			x,
			y,
			//6*Math.PI
			// Math.PI/2 + Math.atan((j-halfj)/(i-halfi)) + ((i-halfi) < 0 ? Math.PI : 0),
			spinAdj + Math.atan2(j-halfj, i-halfi),
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
for(let i = 0; i < 20; i++){
	
	// Make a coin
	coin[i] = new PIXI.Sprite(texture);

	// Place
	coin[i].x = app.screen.width 	/ 2 * (random() * 0.4 - 0.2) + app.screen.width / 2;
	coin[i].y = app.screen.height 	/ 2 * (random() * 0.4 - 0.2) + app.screen.height / 2;

	coin[i].acceleration = new PIXI.Point(0);
	coin[i].speed = new PIXI.Point(0);
	coin[i].speed.y = random() * 1 - 0.5; 
	coin[i].speed.x = random() * 1 - 0.5;

	// Center and make it smaller
	coin[i].scale.set(0.5);
	coin[i].anchor.set(0.5);

	// For bump physics
	coin[i].circular 	= true;
	coin[i].radius 		= 25;

	// Add it to the game
	app.stage.addChild(coin[i]);

}


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
delay = [15,15,15,15];
timer = [0,0,0,0];
timeout = [70, 150, -1, 40]
//		   Top Red   Left G  Bot Blu Right Yel
startX 	= [0		,-400	,0		,400	];
startY 	= [-400		,0		,400	,0		];
endX 	= [0		,-400+50,0		,400-50	];
endY 	= [-400+50	,0		,400-50	,0		];


reset = 49 // "!"
keyboard(reset).press = function(){
	setCookie("played", "false", 1)
	console.log("Cookie set RESET: ", document.cookie)
}


key = [];
keyCode = [38,37,40,39];
space = 32;
pressers = []
for(let k = 0; k<4; k++){
	// hippo texture
	hippoText[k] = PIXI.Texture.from('images/hippo'+k+'.png');
	// make hippo sprite
	hippo[k] = new PIXI.Sprite(hippoText[k]);
	hippo[k].visible = true
	// center and make it smaller
	hippo[k].scale.set(0.5);
	hippo[k].anchor.set(0.5);
	// hippo starting X and Y position with offset
	hippo[k].x = app.screen.width / 2  + startX[k];
	hippo[k].y = app.screen.height / 2 + startY[k];
	// add hippo to stage
	app.stage.addChild(hippo[k]);
	tink.makeInteractive(hippo[k]);


	//up 0 left 1 down 2 right 3
	key[k] = keyboard(keyCode[k]);

	// Add the presser to the array
	pressers[k] = function() {
		if(timer[k] < delay[k]) return;
		timer[k] = 0;
		hippo[k].x = app.screen.width / 2  + endX[k];
		hippo[k].y = app.screen.height / 2 + endY[k];
	};

	//arrow key `press` method (KEYBOARD)
	if(k == 2) // player only
	key[k].press = pressers[k]

	// //arrow key `release` method
	// key[k].release = function () {
	// 	hippo[k].x = app.screen.width / 2 * 0.85 + startX[k];
	// 	hippo[k].y = app.screen.height / 2 + startY[k];
	// };

	//arrow key `press` method (MOUSE)
	if(k == 2) // player only
	hippo[k].press = function () {
		if(timer[k] < delay[k]) return;
		timer[k] = 0;
		hippo[k].x = app.screen.width / 2  + endX[k];
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

// Add space
keyboard(space).press = function() {
	if(timer[2] < delay[2]) return;
	timer[2] = 0;
	hippo[2].x = app.screen.width / 2  + endX[2];
	hippo[2].y = app.screen.height / 2 + endY[2];
};


// Generate hippo interference range
hippoSplash = []
hippoDetect = []
for(let i = 0; i < 4; i++){

	hippoSplash[i] = {
		x: 				app.screen.width / 2 + startX[i],
		y: 				app.screen.height / 2 + startY[i],
		radius: 		350,
		circular: 		true,
		xAnchorOffset: 	0.5,
		yAnchorOffset: 	0.5
	}

	hippoDetect[i] = {
		x: 				app.screen.width / 2 + startX[i],
		y: 				app.screen.height / 2 + startY[i],
		radius: 		200,
		circular: 		true,
		xAnchorOffset: 	0.5,
		yAnchorOffset: 	0.5
	}

}

start = false
end = false
// Menu

menuItems = []

// Initialize the pixi Graphics class
menu = new PIXI.Graphics();

// Draw a menu
menu.beginFill(0x000000); // black
menu.drawRect(app.screen.width/2-300-10, app.screen.height/2-350-10, 600+20, 700+20);
menu.endFill();

menu.beginFill(0xc07548); // black
menu.drawRect(app.screen.width/2-300, app.screen.height/2-350, 600, 700);
menu.endFill();

menuItems.push(menu);

// Write menu

const titleStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 42,
    // fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#bbbbbb',
    strokeThickness: 1,
    dropShadow: true,
    dropShadowColor: '#222222',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    align: 'center',
    wordWrap: true,
    wordWrapWidth: 700,
});

const menustyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 32,
    // fontStyle: 'italic',
    fontWeight: 'bold',
    // fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#bbbbbb',
    strokeThickness: 1,
    // dropShadow: true,
    // dropShadowColor: '#222222',
    // dropShadowBlur: 4,
    // dropShadowAngle: Math.PI / 6,
    // dropShadowDistance: 6,
    align: 'center',
    wordWrap: true,
    wordWrapWidth: 450,
});

const messagesStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 32,
    // fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#ffff33'], // gradient
    stroke: '#bbbbbb',
    strokeThickness: 1,
    dropShadow: true,
    dropShadowColor: '#222222',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    align: 'center',
    wordWrap: true,
    wordWrapWidth: 700,
});

menuText = new PIXI.Text("Hungry Hungry Hippos!", titleStyle);
menuText.x = app.screen.width/2/2-20
menuText.y = app.screen.height/2-300
menuItems.push(menuText);

menuText = new PIXI.Text("Catch as many floating coins as you can!", menustyle);
menuText.x = app.screen.width/2/2
menuText.y = app.screen.height/2-300+100
menuItems.push(menuText);

menuText = new PIXI.Text("Use spacebar to eat coins!", menustyle);
menuText.x = app.screen.width/2/2
menuText.y = app.screen.height/2-300+200
menuItems.push(menuText);

menuText = new PIXI.Text("Game will start when all players are connected", menustyle);
menuText.x = app.screen.width/2/2
menuText.y = app.screen.height/2-300+400
menuItems.push(menuText);

messages = [
	"Waiting for players 1/4...",
	"Waiting for players 2/4.. ",
	"Waiting for players 2/4.  ",
	"Waiting for players 3/4.. ",
	"Waiting for players 2/4...",
	"Waiting for players 2/4.. ",
	"Waiting for players 3/4.  ",
	"Waiting for players 4/4.. ",
	"Waiting for players 4/4...",

	"( Syncing all Players... )",

	"   All Players connected! ",

	"   You are the BLUE hippo ", //6
	"   You are the BLUE hippo ",
	"   You are the BLUE hippo ",

	"       Starting in 5      ",
	"       Starting in 4      ",
	"       Starting in 3      ",
	"       Starting in 2      ",
	"       Starting in 1      ",

	"             GO!           ", //0
	""
]

menuText = new PIXI.Text("", messagesStyle);
menuText.x = app.screen.width/2/2+30
menuText.y = app.screen.height/2+200
menuItems.push(menuText);

// Draw all text
for(let i = 0; i < menuItems.length; i++){
	app.stage.addChild(menuItems[i]);
}

// Countdown
countingDown = true
function countDown(){
	menuText.text = messages.shift()
	if(messages.length <= 0){
		countingDown = false
		start = true
		for(let i = 0; i < menuItems.length; i++){
			app.stage.removeChild(menuItems[i]);
			blurFil.blur = 0
		}
	}
	if(countingDown)
		setTimeout(() =>{
			countDown()
			},1000 + ((messages.length < 9) ? 0 : Math.random()*1000)
		)
}


const blurFil = new PIXI.filters.BlurFilter();
blurFil.blur = 10

// Add blur
for(let i = 0; i < 4; i++){
	hippo[i].filters = [blurFil];
	text[i].filters = [blurFil];
}
circle.filters = [blurFil];

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
	var c = ca[i];
	while (c.charAt(0) == ' ') {
		c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

// Set the cookie
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	// document.cookie = cname + "=" + cvalue + ";" + expires + ";path=index.html";
	document.cookie = cname + "=" + cvalue;
}

console.log("Cookie read: ", document.cookie)
console.log("Cookie reader: ", getCookie("played"))
if(getCookie("played") == "false" || getCookie("played") == ""){

	setCookie("played", "true", 1)
	console.log("Cookie set2: ", document.cookie)
	countDown()
}else{
	ending()
}

function ending(){
	menu = new PIXI.Graphics();

	// Draw a menu
	menu.beginFill(0x000000); // black
	menu.drawRect(app.screen.width/2-300-10, app.screen.height/2-350-10, 600+20, 700+20);
	menu.endFill();

	menu.beginFill(0xc07548); // black
	menu.drawRect(app.screen.width/2-300, app.screen.height/2-350, 600, 700);
	menu.endFill();
	app.stage.addChild(menu);

	blurFil.blur = 10
	const endsyle = new PIXI.TextStyle({
	    fontFamily: 'Arial',
	    fontSize: 32,
	    // fontStyle: 'italic',
	    fontWeight: 'bold',
	    // fill: ['#ffffff', '#00ff99'], // gradient
	    stroke: '#bbbbbb',
	    strokeThickness: 1,
	    wordWrap: true,
	    wordWrapWidth: 450,
	});

	menuText = new PIXI.Text("Game Over!", titleStyle);
	menuText.x = app.screen.width/2/2+40
	menuText.y = app.screen.height/2-300
	app.stage.addChild(menuText);

	finalScore = `
		      Scoreboard:


		1.  Red      Hippo .... 6
		1.  Green  Hippo .... 6
		1.  Yellow Hippo .... 6
		4.  Blue    Hippo .... 2 (You)





		Thank you for playing!
	`

	menuText = new PIXI.Text(finalScore, endsyle);
	menuText.x = app.screen.width/2/2
	menuText.y = app.screen.height/2-300+100
	app.stage.addChild(menuText);
}

// Ticks
app.ticker.add((delta) => {

	// Game over scene
	if(end){
		ending()
		end = false; //only run this once
	}

	if(!start)
		return

	for(let i = 0; i < menuItems.length; i++){
		app.stage.removeChild(menuItems[i]);
		blurFil.blur = 0
	}

	// delta *= 1

	// Deterministic:
	delta = 1

	coinsLeft = 20

	for(let i = 0; i < 20; i++){
		// Check for new acceleration in vector field

		// If coin eaten then place it far and ignore it
		if(!coin[i].visible){
			coin[i].x = 450
			coin[i].y = 450
			coinsLeft--;
			if(coinsLeft == 0){
				end = true
			}
			continue
		}

		x = Math.floor(coin[i].x/perPix)
		y = Math.floor(coin[i].y/perPix)

		// Always posative (0 to 1)
		dx = coin[i].x/perPix - x;
		dy = coin[i].y/perPix - y;

		vect 	= vectorField[x][y]
		mag 	= vect.myMag

		// Physics vector field
		coin[i].acceleration.x = Math.cos(vect.rotation - Math.PI/2) * mag
		coin[i].acceleration.y = Math.sin(vect.rotation - Math.PI/2) * mag

		// If hippo splash, then hippo acceleration 
		for(let k = 0; k < 4; k++){

			hipposLeft = 4
			for(let l = 0; l < 4; l++) if(limit[l] == score[l]) hipposLeft--

			// Which hippo is last
			lastHippo = -1
			if(hipposLeft == 1)
				for(let l = 0; l < 4; l++) if(limit[l] != score[l]) lastHippo = l

			// If this coin is close and hippo is recently closed then splash
			if(timer[k] == 0 && inCircleRange(hippoSplash[k], coin[i])){
				// Find angle between hippo splash and coin
				angle = Math.atan2(coin[i].y - hippoSplash[k].y, coin[i].x - hippoSplash[k].x)

				//Player hippo push away, if cpu then attract
				mag = k == 2 ? 0.1 : -0.1

				mag = 0.5

				// Strong splash if it is at limit
				mag = limit[k] == score[k] ? 0.5 : mag

				//If only 1 hippo left then attract all else push hard
				if(hipposLeft == 1){
					console.log("last hippo", lastHippo)
					mag = lastHippo == k ? -1 : 1
				}

				// Using angle as vector direction push coin
				coin[i].acceleration.x = Math.cos(angle) * mag
				coin[i].acceleration.y = Math.sin(angle) * mag
			}

			// If this coin is close and hippo that is at limit
			if(inCircleRange(hippoDetect[k], coin[i]) && limit[k] == score[k]){
				// Find angle between hippo splash and coin
				angle = Math.atan2(coin[i].y - hippoSplash[k].y, coin[i].x - hippoSplash[k].x)

				//limit hippo push away
				mag = 0.5

				// Using angle as vector direction push coin
				coin[i].acceleration.x = Math.cos(angle) * mag
				coin[i].acceleration.y = Math.sin(angle) * mag
			}
		}

		// If there is only 1 coin left then B-line to the last hippo
		if(coinsLeft == 1){
			lastHippo = -1
			for(let k = 0; k < 4; k++){

				hipposLeft = 4
				for(let l = 0; l < 4; l++) if(limit[l] == score[l]) hipposLeft--

				// Which hippo is last
				lastHippo = -1
				if(hipposLeft == 1)
					for(let l = 0; l < 4; l++) if(limit[l] != score[l]) lastHippo = l
			}

			// Find angle between hippo splash and coin
			angle = Math.atan2(coin[i].y - hippoSplash[lastHippo].y, coin[i].x - hippoSplash[lastHippo].x)

			// Attract
			mag = -10

			// Using angle as vector direction push coin
			coin[i].acceleration.x = Math.cos(angle) * mag
			coin[i].acceleration.y = Math.sin(angle) * mag
		}

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

		// Abs speed
		coin[i].speed.r = Math.sqrt(coin[i].speed.x*coin[i].speed.x+coin[i].speed.y*coin[i].speed.y);


		// Air resistance only if above certain speed
		airResist = 0.005
		if(coin[i].speed.r >= 0.1 && false){
			coin[i].acceleration.x -= Math.cos(coin[i].rotation - Math.PI/2) * airResist * coin[i].speed.r;
			coin[i].acceleration.y -= Math.sin(coin[i].rotation - Math.PI/2) * airResist * coin[i].speed.r;
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

		// Update position
		coin[i].x += coin[i].speed.x * delta
		coin[i].y += coin[i].speed.y * delta

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
		for(let k = 0; k < 4; k++){

			// Check if this coin is close to hippo
			if(inCircleRange(hippoDetect[k], coin[i])){
				// Unless it is player
				if(k != 2) pressers[k]()
			}

			if (timer[k] >= 5){
				hippo[k].x = app.screen.width / 2  + startX[k];
				hippo[k].y = app.screen.height / 2 + startY[k];
			}

			// After a longer time it should click
			if (timer[k] >= timeout[k]){
				if(k != 2) pressers[k]()
			}

			if(bump.hitTestRectangle(hippo[k],coin[i])){
				if (coin[i].visible && score[k]<limit[k] && timer[k]<5){
					coin[i].visible = false;
					text[k].text = "" + ++score[k];
				}
			}
		}
	}

	// Change all the vectors to center onto a non limit hippo
	// for each hippo find the one that is not at max at a prioty
	hipposLeft = 4
	for(let l = 0; l < 4; l++) if(limit[l] == score[l]) hipposLeft--


	hx 		= halfi;
	hy 		= halfj;
	hippoSel = -1;
	// Only bias (where k = 2 is last)
	if(hipposLeft <= 3)
	for(let k = 2; k < 2+4;k++){
		if(limit[k%4] != score[k%4])
			hippoSel = k%4;
	}

	// Chosen hippo, direct all vectors to that hippo (if there are only 2 hippos that haven't ate)
	if(hippoSel != -1){
		hx = hippoSplash[hippoSel].x/perPix - 0.5
		hy = hippoSplash[hippoSel].y/perPix - 0.5
	}

	initalMag = -0.01;
	finalMag = -0.05;
	deltaMag = finalMag - initalMag
	// As there are less coins increase mag
	coinCount = 0;
	for(let i = 0; i < 20; i++) if(coin[i].visible) coinCount++;

	// if count is at 100% then it will be at initalMag, otherwise linearly close to final
	mag = initalMag + (deltaMag)*(coinCount/20)

	// For each vector make it change direction
	for(let i = 0; i < vectorField.length; i++)
		for(let j = 0; j < vectorField[i].length; j++){
			vectorField[i][j].rotation = Math.PI/2 + Math.atan2(j-hy, i-hx)
		}

	for(let k = 0; k < 4;k++) timer[k]++;

	// Check coin locations to not be overlaping
	bump.multipleCircleCollision(coin)
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

	// visable
	vect.visible = false;

	// set the d and m
	vect.myMag = m;
	vect.scale.set((maxScale - minScale) * m + minScale);
	// vect.scale.set(0.03);
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

function updateDirection(vector, newPos){
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

function onDragMove() {
	if (this.dragging) {
		const newPosition = this.data.getLocalPosition(this.parent);

		// updateDirection(this, newPosition)

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

function inCircleRange(circle, point){
	// Delta
	dx = point.x - circle.x;
	dy = point.y - circle.y;

	hyp = Math.sqrt(dx*dx+dy*dy);

	return hyp <= circle.radius;
}