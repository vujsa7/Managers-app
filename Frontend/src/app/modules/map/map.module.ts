import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MapRoutingModule } from "./map-routing.module";
import { D3Service } from "./services/d3.service";
import { RenovationPreviewComponent } from './floor-plan/components/renovation-preview/renovation-preview.component';

@NgModule({
    imports: [
        CommonModule,
        MapRoutingModule
    ],
    exports:[
        RenovationPreviewComponent
    ],
    providers: [
        D3Service
    ],
    declarations: [
      RenovationPreviewComponent
    ]
})

export class MapModule { }