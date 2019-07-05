class TheStartScene extends Scene {

    width;
    height;
    eyes;

    background_img;
    font;

    header;
    subtext;
    
    lastBlink

    constructor() {
        super()

        this.width = 0;
        this.height = 0;
        this.eyes = 0;

        this.background_img = 0;

    }

    load() {
        this.background_img = loadImage(`/assets/background/starfield_02.png`)
        this.font = loadFont(`/assets/Gravedigger.otf`);

    }

    init(width, height, eyes) {
        this.width = width;
        this.height = height;
        this.eyes = eyes;

        this.header = createGraphics(this.width, 30);
        this.header.textAlign(CENTER);
        this.header.textFont(this.font);
        this.header.textSize(22);
        this.header.fill(0);

        this.subtext = createGraphics(this.width, 30);
        this.subtext.textAlign(CENTER);
        this.subtext.textFont('Source Code Pro');
        this.subtext.textSize(18);
        this.subtext.fill(0);

        this.lastBlink = moment();

    }

    loop() {
        let curr = moment();

        push();
        imageMode(CENTER);
        scale(0.3);
        image(this.background_img, 0, 0);
        pop();

        this.header.text(`SPACE SHOOTER`, this.width/2, 25);

        this.subtext.text(`press space key to start`, this.width/2, 25);

        image(this.header, -this.width / 2, -75);

        if (curr.diff(this.lastBlink, 'seconds') > 0 ) {
            image(this.subtext, -this.width / 2, -50);
        } 
        if (curr.diff(this.lastBlink, 'seconds') > 1 ) {
            this.lastBlink = moment();
        }

        if (keyIsPressed === true && keyCode == 32) {
            scenes[1].reset();
            CURR_SCENE = 1;
        }

    }
}