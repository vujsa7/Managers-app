import { RoomStatus } from "@app/shared/models/room-status.enum";
import { RoomType } from "@app/shared/models/room-type.enum";

export class NewRoomInfo{
    public roomName: string; 
    public roomType: RoomType;
    public roomStatus: RoomStatus;

    constructor(roomName: string, roomType: RoomType, roomStatus: RoomStatus){
        this.roomName = roomName;
        this.roomType = roomType;
        this.roomStatus = roomStatus;
    }
}