export default class HearthsUI extends Phaser.GameObjects.GameObject {
    #hearths: Phaser.GameObjects.Image[];

    static START_X = 100;
    static START_Y = 0;
    static HEARTH_SIZE = 30;
    static HEARTH_SPACING = 5;
    static TEXTURE = 'hearth';
    static EMPTY_TEXTURE = 'empty_hearth';

    constructor(scene: Phaser.Scene)
    {
        super(scene,'hearthsUI');
        this.#hearths = [];

    }

    #createHearth()
    {
        let i = this.#hearths.length;
        let newHearth = this.scene.add.image(HearthsUI.START_X + i * (HearthsUI.HEARTH_SIZE + HearthsUI.HEARTH_SPACING), HearthsUI.START_Y, HearthsUI.TEXTURE);
        newHearth.setOrigin(0,0);
        newHearth.setDisplaySize(HearthsUI.HEARTH_SIZE, HearthsUI.HEARTH_SIZE);
        newHearth.setScrollFactor(0);
        this.#hearths.push(newHearth);
    }

    update(currentHP: number, maxHP: number) {
        while(this.#hearths.length < maxHP)
            this.#createHearth();
        while(this.#hearths.length > maxHP)
            this.#hearths.pop()?.destroy();
        
        for(let i = 0; i<this.#hearths.length; i++)
            if(i+1 <= currentHP)
                this.#hearths[i].setTexture(HearthsUI.TEXTURE);
            else
                this.#hearths[i].setTexture(HearthsUI.EMPTY_TEXTURE);
    }
}