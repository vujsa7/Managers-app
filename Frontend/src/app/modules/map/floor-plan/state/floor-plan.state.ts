import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UpdateSelectedRoomId, UpdateSelectedEquipmentId } from "./floor-plan.actions";


export class FloorPlanStateModel {
    selectedRoomId!: number;
    selectedEquipmentId!: number;
}

@State<FloorPlanStateModel>({
    name: 'floorplanstate',
    defaults: {
        selectedRoomId: -1,
        selectedEquipmentId: -1
    }
})
@Injectable()
export class FloorPlanState {

    constructor() { }

    @Selector()
    static selectSelectedRoomId(state: FloorPlanStateModel) {
        return state.selectedRoomId;
    }

    @Action(UpdateSelectedRoomId)
    updateSelectedRoomIdInState(ctx: StateContext<FloorPlanStateModel>, { roomId }: UpdateSelectedRoomId) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            selectedRoomId: roomId
        })
    }

    @Selector()
    static selectSelectedEquipmentId(state: FloorPlanStateModel) {
        return state.selectedEquipmentId;
    }

    @Action(UpdateSelectedEquipmentId)
    updateSelectedEquipmentIdInState(ctx: StateContext<FloorPlanStateModel>, { equipmentId }: UpdateSelectedEquipmentId) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            selectedEquipmentId: equipmentId
        })
    }
}