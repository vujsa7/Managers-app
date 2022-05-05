import { RoomType } from "@app/shared/models/room-type.enum";
import { RoomStatus } from "./room-status.enum";

export class RoomBasicInfo{
    public id: number;
    public name: string;
    public type: RoomType;
    public floor: number;
    public buildingId: number;
    public status: RoomStatus;

    constructor(id: number, name: string, type: RoomType, floor: number, buildingId: number, status: RoomStatus) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.floor = floor;
        this.buildingId = buildingId;
        this.status = status;
    }
}