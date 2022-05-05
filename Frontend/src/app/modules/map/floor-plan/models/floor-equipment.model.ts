export class FloorEquipment {
    public id: number;
    public roomId: number;
    public roomName: string;
    public roomType: number;
    public roomFloor: number;
    public equipmentItemName: string;
    public quantity: number;

    constructor(id: number, roomId: number, roomName: string, type: number, roomFloor: number, equipmentItemName: string, quantity: number) {
        this.id = id;
        this.roomId = roomId;
        this.roomName = roomName;
        this.roomType = type;
        this.roomFloor = roomFloor;
        this.equipmentItemName = equipmentItemName;
        this.quantity = quantity;
    }
}