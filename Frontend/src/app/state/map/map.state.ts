import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { tap } from 'rxjs/operators';
import { patch, updateItem } from '@ngxs/store/operators';
import { FloorRoom } from "@app/modules/map/floor-plan/models/floor-room.model";
import { FloorPlanService } from "@app/modules/map/floor-plan/services/floor-plan.service";
import { GetBuildings, GetFloorEquipment, GetFloorRooms, UpdateFloorRoom} from "./map.actions";
import { FloorEquipment } from "@app/modules/map/floor-plan/models/floor-equipment.model";
import { Building } from "@app/modules/map/building-plan/models/building.model";
import { BuildingService } from "@app/modules/map/building-plan/services/building.service";
import { passedXMinutes } from "@app/core/utils/timer.util";
import _ from "lodash";

export class MapStateModel{
    buildings!: Building[];
    floorRooms!: FloorRoom[];
    floorEquipment!: FloorEquipment[];
    dateSaved!: Date;
}

@State<MapStateModel>({
    name: 'mapstate',
    defaults: {
        buildings: [],
        floorRooms: [],
        floorEquipment: [],
        dateSaved: new Date()
    }
})
@Injectable()
export class MapState {

    constructor(private floorPlanService: FloorPlanService, private buildingService: BuildingService) { }

    @Selector()
    static selectBuildings(state: MapStateModel){
        return state.buildings;
    }

    @Action(GetBuildings)
    getBuildingsFromState(ctx: StateContext<MapStateModel>) {
        let state = ctx.getState();
        if(state.buildings.length != 0)
            return;
        return this.buildingService.getBuildings().pipe(tap(data => {
            state = ctx.getState();
            ctx.setState({
                ...state,
                buildings: data
            })
        }))
    }

    @Selector()
    static selectFloorRooms(state: MapStateModel){
        return state.floorRooms;
    }

    @Action(GetFloorRooms)
    getFloorRoomsFromState(ctx: StateContext<MapStateModel>, { buildingId }: GetFloorRooms) {
        let state = ctx.getState();
        // Caching implementation
        if(state.floorRooms.length != 0)
            return;
        // If there is no floor rooms fetch from API
        return this.floorPlanService.getFloorRoomsInBuilding(buildingId).pipe(tap(data => {
            state = ctx.getState(); // Getting state again since this is asyncronous function
            ctx.setState({
                ...state,
                floorRooms: data, // here the data coming from the API will get assigned to the floorRooms variable inside the mapstate
                dateSaved: new Date()
            })
        }))
    }

    @Selector()
    static selectFloorEquipment(state: MapStateModel){
        return state.floorEquipment;
    }

    @Action(GetFloorEquipment)
    getFloorEquipmentFromState(ctx: StateContext<MapStateModel>) {
        let state = ctx.getState();

        // IF WE ALREADY HAVE A LIST AND IF IT DIDN'T PASS 1 MINUTES SINCE LAST 
        if(state.floorEquipment.length != 0 && !passedXMinutes(new Date(state.dateSaved), 1))
            return;
        return this.floorPlanService.getEquipmentInBuilding().pipe(tap(data => {
            state = ctx.getState();
            ctx.setState({
                ...state,
                floorEquipment: data,
                dateSaved: new Date()
            })
        }))
    }

    @Action(UpdateFloorRoom)
    updateFloorRoom(ctx: StateContext<MapStateModel>, { roomWithEquipment }: UpdateFloorRoom){
        let floorRooms = ctx.getState().floorRooms;
        let floorRoom = _.clone(_.find(floorRooms, r => r.id == roomWithEquipment.id))!;
        floorRoom.name = roomWithEquipment.name;
        floorRoom.status = roomWithEquipment.status;
        floorRoom.type = roomWithEquipment.type;
        ctx.setState(
            patch({
                floorRooms: updateItem<any>(r => r.id == floorRoom.id, floorRoom)
            })
        )
    }

   

}