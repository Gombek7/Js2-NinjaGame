import HealthBar from "./HealthBar";

export default class HittableObject extends Phaser.Physics.Arcade.Sprite {
    #MaxHP;
    #CurrentHP;
    #healthBar: HealthBar;
	constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);

        this.#MaxHP = 1;
        this.#CurrentHP = 1;
        this.#healthBar = new HealthBar(scene);
        this.#healthBar.value = 100;
    }

    set MaxHP(value: number)
    {
        this.#MaxHP = value;
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
            this.#onDead();
        }
        if(this.#CurrentHP > this.#MaxHP)
        {
            this.#CurrentHP = this.#MaxHP;
        }
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
        this.#healthBar.isHidden = true;
    }

    get isHealthbarHidden()
    {
        return this.#healthBar.isHidden;
    }

    set isHealthbarHidden(value: boolean)
    {
        this.#healthBar.isHidden = value;
        this.#healthBar.draw;
    }

    #onDead(){

    };

    Hit(damage: number)
    {
        if(this.isDead)
            return;

        this.#CurrentHP -= damage;
        this.#healthBar.value = 100 * this.#CurrentHP / this.#MaxHP;

        if(this.isDead)
        {
            this.#onDead();
        }
    }

    update(time, delta) {
        //FIXME: Glitching healthbar when moving with camera
        super.update(time, delta);
        this.#healthBar.setPosition(this.x - this.width/4, this.y - this.height/4);
    }
}