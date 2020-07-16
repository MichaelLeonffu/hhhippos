const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

// Create a new texture
const texture = PIXI.Texture.from('images/zerotwosmall.png');

var happyCounter = 2;

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#ffbbff'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#ffffff',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});

const richText = new PIXI.Text('Zero Two!', style);
richText.x = 50;
richText.y = 250;

app.stage.addChild(richText);

console.log(window.location)

num2w = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine"
]

// Create a 5x5 grid of bunnies
for (let i = 0; i < 25; i++) {
    const bunny = new PIXI.Sprite(texture);

    bunny.scale.set(0.25, 0.25);
    bunny.anchor.set(0.5);

    
    bunny.x = (i % 5) * 40/0.25;
    bunny.y = Math.floor(i / 5) * 40/0.25;
    container.addChild(bunny);

    bunny.interactive = true;
    bunny.buttonMode = true;

    bunny.on('pointerdown', onClick);

    function onClick(){
	happyCounter++;
	bunny.scale.x *= 0.90;
	bunny.scale.y *= 0.90;
	//window.location.href = window.location.origin + "/images/zerotwosmall.png"
	text = ""
	count = 0
	happyCounter1 = happyCounter;
	while(happyCounter1 > 0){
	    text = num2w[happyCounter1%10] + " " + text
	    happyCounter1 = Math.floor(happyCounter1/10)
	    count++;
	    if(count > 500)
		return
	}
	
	if(happyCounter < 10){
	    text = "Zero " + text
	}
	
	richText.text = text + "!"
    }
}

// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

// Listen for animate update
app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    container.rotation -= 0.01 * delta;
});
