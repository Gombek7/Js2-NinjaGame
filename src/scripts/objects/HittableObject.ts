import HealthBar from "./HealthBar";

export default class HittableObject extends Phaser.Physics.Arcade.Sprite {
    #MaxHP;
    #CurrentHP;
    #healthBar: HealthBar | null;
	constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);

        this.#MaxHP = 1;
        this.#CurrentHP = 1;

        this.#healthBar = null;

        this.showHealthbar();
    }

    showHealthbar()
    {
        if (this.#healthBar instanceof HealthBar)
            return;
        
        this.#healthBar = new HealthBar(this.scene);
        this.#healthBar.value = 100 * this.#CurrentHP / this.#MaxHP;
        this.#healthBar.draw();
    }

    hideHealthbar()
    {
        if (!(this.#healthBar instanceof HealthBar))
            return;
        
        this.#healthBar.destroy();
        this.#healthBar = null;
    }

    set MaxHP(value: number)
    {
        this.#MaxHP = value;
        if (this.#healthBar instanceof HealthBar)
            this.#healthBar.value = 100 * this.#CurrentHP / this.#MaxHP;
    }

    get MaxHP()
    {
        return this.#MaxHP;
    }

    get CurrentHP()
    {
        return this.#CurrentHP;
    }

    set CurrentHP(value: number)
    {
        this.#CurrentHP = value;

        if(this.#CurrentHP < 0)
        {
            this.#CurrentHP = 0;
            this.onDead();
        }
        if(this.#CurrentHP > this.#MaxHP)
        {
            this.#CurrentHP = this.#MaxHP;
        }
        if (this.#healthBar instanceof HealthBar)
            this.#healthBar.value = 100 * this.#CurrentHP / this.#MaxHP;
    }

    get isDead()
    {
        return this.#CurrentHP <= 0;
    }

    set isDead(value: boolean)
    {
        if (value)
            this.Hit(this.#CurrentHP);
    }

    get isHealthbarHidden()
    {
        return !(this.#healthBar instanceof HealthBar);
    }

    set isHealthbarHidden(value: boolean)
    {
        if(value)
            this.hideHealthbar();
        else
            this.showHealthbar();
        
    }

    onDead(){
        this.hideHealthbar();
    };

    Hit(damage: number)
    {
        if(this.isDead)
            return;

        this.#CurrentHP -= damage;

        if (this.#healthBar instanceof HealthBar)
            this.#healthBar.value = 100 * this.#CurrentHP / this.#MaxHP;

        if(this.isDead)
        {
            this.onDead();
        }
    }

    update(time, delta) {
        //FIXME: Glitching healthbar when moving with camera
        super.update(time, delta);
        if (this.#healthBar instanceof HealthBar)
            this.#healthBar.setPosition(this.x - this.width*this.scaleX/2, this.y - this.height*this.scaleY/2 - 10);
    }

    destroy(fromScene?: boolean): void {
        this.hideHealthbar();
        super.destroy(fromScene);
    }
}