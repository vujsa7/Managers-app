import { RoomStatus, RoomType } from "@app/shared/models/room.model";
import { Equipment } from "./equipment.model";

export class Room {
    public id: number;
    public buildingId: number;
    public name: string;
    public status: RoomStatus;
    public type: RoomType;
    public floor: number;
    public equipment: Equipment[];

    constructor(id: number, buildingId: number, name: string, status: RoomStatus, type: RoomType, freeBeds: number, floor: number, x: number, y: number, width: number, height: number, equipment: Equipment[]) {
        this.id = id;
        this.buildingId = buildingId;
        this.name = name;
        this.status = status;
        this.type = type;
        this.floor = floor;
        this.equipment = equipment;
    }

}
