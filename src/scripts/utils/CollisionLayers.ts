import CollisionLayer from "./CollisionLayer";

let PlayerLayer = new CollisionLayer();
let PickablesLayer = new CollisionLayer();

PickablesLayer.overlapWith(PlayerLayer);

export {PlayerLayer, PickablesLayer};