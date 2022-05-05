import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { throwIfAlreadyLoaded } from "./guards/import.guard";
import { BaseHttpService } from "./services/base-http.service";

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        BaseHttpService
    ]
})

export class CoreModule {
    //This way we are ensuring that CoreModule is imported only once in the AppModule
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}