export class EquipmentWithRoom {
    public id: number;
    public roomId: number;
    public roomName: string;
    public roomType: number;
    public roomFloor: number;
    public equipmentItemId: number;
    public equipmentItemName: string;
    public quantity: number;
    public reservedQuantity: number;

    constructor(id: number, roomId: number, roomName: string, type: number, roomFloor: number, equipmentItemId: number, equipmentItemName: string, quantity: number, reservedQuantity: number) {
        this.id = id;
        this.roomId = roomId;
        this.roomName = roomName;
        this.roomType = type;
        this.roomFloor = roomFloor;
        this.equipmentItemId = equipmentItemId;
        this.equipmentItemName = equipmentItemName;
        this.quantity = quantity;
        this.reservedQuantity = reservedQuantity;
    }
}