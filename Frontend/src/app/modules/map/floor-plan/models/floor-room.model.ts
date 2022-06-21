import { RoomStatus } from "@app/shared/models/room-status.enum";
import { RoomType } from "@app/shared/models/room-type.enum";

export class FloorRoom {
    public id: number;
    public buildingId: number;
    public name: string;
    public status: RoomStatus;
    public type: RoomType;
    public floor: number;
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(id: number, buildingId: number, name: string, status: RoomStatus, type: RoomType, floor: number, x: number, y: number, width: number, height: number) {
        this.id = id;
        this.buildingId = buildingId;
        this.name = name;
        this.status = status;
        this.type = type;
        this.floor = floor;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}