import { RoomType } from "@app/shared/models/room-type.enum";

export class EquipmentTransfer {
    public id?: number;
    public sourceRoomId: number;
    public sourceRoomName: string;
    public sourceRoomType: RoomType;
    public destinationRoomId: number;
    public destinationRoomName: string;
    public destinationRoomType: RoomType;
    public quantity: number;
    public equipmentId: number;
    public transferDuration: number;
    public transferDate: Date;

    constructor(sourceRoomId: number, sourceRoomName: string, sourceRoomType: RoomType, destinationRoomId: number, destinationRoomName: string, destinationRoomType: RoomType, quantity: number, equipmentId: number, transferDuration: number, transferDate: Date, id?: number){
        this.id = id;
        this.sourceRoomId = sourceRoomId;
        this.sourceRoomName = sourceRoomName;
        this.sourceRoomType = sourceRoomType;
        this.destinationRoomId = destinationRoomId;
        this.destinationRoomName = destinationRoomName;
        this.destinationRoomType = destinationRoomType;
        this.quantity = quantity;
        this.equipmentId = equipmentId;
        this.transferDuration = transferDuration;
        this.transferDate = transferDate;
    }
}