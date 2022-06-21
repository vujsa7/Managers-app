import { Injectable } from "@angular/core";
import { RoomDetailsService } from "@app/modules/room/services/room-details.service";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { GetFloorRooms, UpdateFloorRoom } from "../map/map.actions";
import { UpdateRoom } from "./room.actions";

export class RoomStateModel{}

@State<RoomStateModel>({
    name: 'roomstate',
    defaults: {}
})
@Injectable()
export class RoomState {

    constructor(private roomDetailsService: RoomDetailsService, private store: Store) { }

    @Action(UpdateRoom)
    updateRoomDetailsInState(ctx: StateContext<RoomStateModel>, { room }: UpdateRoom) {
        return this.roomDetailsService.updateRoom(room).pipe(tap(data => {
           this.store.dispatch(new UpdateFloorRoom(room));
        }))
    }
    
}