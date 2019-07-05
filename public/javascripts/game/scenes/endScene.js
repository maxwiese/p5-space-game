class TheEndScene extends Scene {

    width;
    height;
    eyes;

    background_img;
    font;

    header;
    subtext;
    score;
    scoreboard;

    data;
    postUrl;
    saved;

    lastBlink

    constructor() {
        super()

        this.width = 0;
        this.height = 0;
        this.eyes = 0;

        this.background_img = 0;

        this.postUrl = "/scoreboard";
        this.saved = false;

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
        this.header.textFont(this.font);
        this.header.textAlign(CENTER);
        this.header.textSize(22);
        this.header.fill(0);

        this.score = createGraphics(this.width, 30);
        this.score.textFont(this.font);
        this.score.textAlign(CENTER);
        this.score.textSize(30);

        this.subtext = createGraphics(this.width, 30);
        this.subtext.textFont('Source Code Pro');
        this.subtext.textSize(18);
        this.subtext.textAlign(CENTER);

        this.scoreboard = createGraphics(this.width, 100);
        this.scoreboard.textAlign(CENTER);
        this.scoreboard.textFont('Source Code Pro');
        this.scoreboard.textSize(16);
        this.scoreboard.fill(0);

        this.lastBlink = moment();
        this.data = {};
    }

    loop() {
        if (!this.saved) {
            this.data = { name: "Markus", score: scenes[1].score };
            httpPost(this.postUrl, 'json', this.data, (result) => {
                console.log(result);
            })
            this.saved = true;
        }

        let curr = moment();

        push();
        imageMode(CENTER);
        scale(0.3);
        image(this.background_img, 0, 0);
        pop();

        this.header.text(`GAME OVER`, this.width / 2, 25);

        this.score.fill(255, 0, 0);
        this.score.text(`${scenes[1].score}`, this.width / 2, 25);

        this.subtext.fill(0);
        this.subtext.text(`press space key to start again`, this.width / 2, 25);

        image(this.score, -this.width / 2, -45);

        image(this.header, -this.width / 2, -100);

        for (let i = 0; i < scoreboard.length; i++) {
            this.scoreboard.text(`${i + 1}. ${scoreboard[i].name}: ${scoreboard[i].score}`, this.width / 2, (i * 15) + 50);
        }

        image(this.scoreboard, -this.width / 2, this.scoreboard.height / 2);

        if (curr.diff(this.lastBlink, 'seconds') > 0) {
            image(this.subtext, -this.width / 2, 0);
        }
        if (curr.diff(this.lastBlink, 'seconds') > 1) {
            this.lastBlink = moment();
        }


        if (keyIsPressed === true && keyCode == 32) {
            scenes[1].reset();
            CURR_SCENE = 1;
        }

    }
}