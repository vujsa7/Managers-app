import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MapRoutingModule } from "./map-routing.module";
import { MapComponent } from "./map.component";
import { SharedModule } from "@app/shared/shared.module";
import { MapBackgroundComponent } from "./components/map-background/map-background.component";
import { FloorPlanComponent } from "./components/floor-plan/floor-plan.component";
import { ScrollBoxComponent } from "./components/scroll-box/scroll-box.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { EquipmentCardComponent } from './components/equipment-card/equipment-card.component';
import { BuildingComponentsService } from "./services/building-components.service";
import { BuildingsService } from "./services/buildings.service";

@NgModule({
    declarations: [
        MapComponent,
        MapBackgroundComponent,
        FloorPlanComponent,
        ScrollBoxComponent,
        SideBarComponent,
        EquipmentCardComponent
    ],
    imports: [
        CommonModule,
        MapRoutingModule,
        SharedModule
    ],
    providers: [
        BuildingComponentsService,
        BuildingsService
    ]
})

export class MapModule { }