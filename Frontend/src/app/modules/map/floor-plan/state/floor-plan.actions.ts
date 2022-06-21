
// Comunication between components
export class UpdateSelectedRoomId{
    static readonly type = '[FloorPlan] UpdateSelectedRoomId';
    constructor(public roomId: number) { }
}

// Comunication between components
export class UpdateSelectedEquipmentId{
    static readonly type = '[FloorPlan] UpdateSelectedEquipmentId';
    constructor(public equipmentId: number) { }
}