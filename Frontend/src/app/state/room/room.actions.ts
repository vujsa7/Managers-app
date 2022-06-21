import { RoomWithEquipment } from "@app/modules/room/models/room-with-equipment.model";

export class UpdateRoom{
    static readonly type = '[RoomDetails] UpdateRoom';
    constructor(public room: RoomWithEquipment) { }
}