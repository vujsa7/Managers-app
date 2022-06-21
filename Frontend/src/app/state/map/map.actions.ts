import { RoomWithEquipment } from "@app/modules/room/models/room-with-equipment.model";

export class GetBuildings{
    static readonly type = '[BuildingPlan] GetBuildings';
    constructor() { }
}

export class GetFloorRooms{
    static readonly type = '[FloorPlan] GetFloorRooms';
    constructor(public buildingId: number) { }
}

export class GetFloorEquipment{
    static readonly type = '[FloorPlan] GetFloorEquipment';
    constructor() { }
}

export class UpdateFloorRoom{
    static readonly type = '[RoomState] UpdateFloorRoom';
    constructor(public roomWithEquipment: RoomWithEquipment) { }
}