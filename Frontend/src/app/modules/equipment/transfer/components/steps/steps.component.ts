import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tr-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent {

  @Input() completedSteps: number = 0;
  @Input() mode: string = "equipment-overview";
  @Output() modeChanged = new EventEmitter<string>();

  notifyModeChanged(mode: string){
    this.mode = mode;
    this.modeChanged.emit(mode);
  }

}
