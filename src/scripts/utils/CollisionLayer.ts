export default class CollisionLayer {
    objects: Phaser.GameObjects.GameObject[] 
    #collidesWith: CollisionLayer[]
    #overlapsWith: CollisionLayer[]
    #scene?: Phaser.Scene

    constructor()
    {
        this.objects = []
        this.#collidesWith = []
        this.#overlapsWith = []
    }

    setScene(scene: Phaser.Scene)
    {
        this.#scene = scene
        this.#collidesWith.forEach(layer => {
            this.#scene?.physics.add.collider(this.objects, layer.objects)
        })
        this.#overlapsWith.forEach(layer => {
            this.#scene?.physics.add.overlap(this.objects, layer.objects)
        })
    }

    add(object: Phaser.GameObjects.GameObject)
    {
        if(this.objects.indexOf(object) >= 0)
            return;

        this.objects.push(object);
        this.#collidesWith.forEach(layer => {
            this.#scene?.physics.add.collider(object, layer.objects)
        })
        this.#overlapsWith.forEach(layer => {
            this.#scene?.physics.add.overlap(object, layer.objects)
        })

    }

    remove(object: Phaser.GameObjects.GameObject)
    {
        console.log(object);
        const index = this.objects.indexOf(object);
		if (index > -1)
        {
            this.objects.splice(index, 1);
        }
    }

    collideWith(layer: CollisionLayer)
    {
        if(this.#collidesWith.indexOf(layer) >= 0)
            return;
        this.#collidesWith.push(layer);

        this.#scene?.physics.add.collider(this.objects, layer.objects)
    }

    overlapWith(layer: CollisionLayer)
    {
        if(this.#overlapsWith.indexOf(layer) >= 0)
            return;
        this.#overlapsWith.push(layer);

        this.#scene?.physics.add.overlap(this.objects, layer.objects)
    }
}