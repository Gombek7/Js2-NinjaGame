import CollisionLayer from "./CollisionLayer";

let PlayerLayer = new CollisionLayer();
let PickablesLayer = new CollisionLayer();
let EnemiesLayer = new CollisionLayer();
let TrapsLayer = new CollisionLayer();
let DestroyablesLayer = new CollisionLayer();
let PlatformsLayer = new CollisionLayer();

PlayerLayer.overlapWith(EnemiesLayer);
PlayerLayer.overlapWith(DestroyablesLayer);
PlayerLayer.collideWith(PlatformsLayer);

PickablesLayer.overlapWith(PlayerLayer);

EnemiesLayer.overlapWith(PlayerLayer);
EnemiesLayer.collideWith(PlatformsLayer);

TrapsLayer.overlapWith(PlayerLayer);
TrapsLayer.overlapWith(EnemiesLayer);

DestroyablesLayer.collideWith(PlatformsLayer);

export {PlayerLayer, PickablesLayer, EnemiesLayer, TrapsLayer, DestroyablesLayer, PlatformsLayer};