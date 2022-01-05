export default class HealthBar extends Phaser.GameObjects.Graphics {
    #value;
    #p;
    #width;
    #height;
    #border;
    isHidden: boolean;
    constructor (scene)
    {
        super(scene, {x:0,y:0});
        scene.add.existing(this);
        this.#width = 100;
        this.#height = 10;
        this.#border = 1;

        this.isHidden = false;
        this.draw();

    }

    get value()
    {
        return this.#value;
    }
    
    /*
    Min value: 0
    Max value 100
    */
    set value(percents:number)
    {
        this.#value = percents;
        if (this.#value < 0)
            this.#value = 0;
        else if (this.#value > 100)
            this.#value = 100;

        this.draw();
    }
    decrease (percents: number)
    {
        this.#value -= percents;

        if (this.#value < 0)
        {
            this.#value = 0;
        }

        this.draw();

        return (this.#value === 0);
    }

    draw()
    {
        this.clear();
        
        if(this.isHidden)
            return;
        //  Border
        this.fillStyle(0x000000);
        this.fillRect(0, 0, this.#width, this.#height);

        //  White background
        this.fillStyle(0xffffff);
        this.fillRect(this.#border, this.#border, this.#width - 2 * this.#border, this.#height - 2 * this.#border);

        //  Bar
        if (this.#value < 30)
        {
            this.fillStyle(0xff0000);
        }
        else
        {
            this.fillStyle(0x00ff00);
        }

        this.fillRect(this.#border, this.#border, this.#width * this.#value/100 - 2 * this.#border, this.#height - 2 * this.#border);
    }

}