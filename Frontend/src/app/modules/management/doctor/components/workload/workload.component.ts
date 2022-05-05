import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Doctor } from '@app/shared/models/doctor.model';
import { OnCallShift } from '../../models/on-call-shift.model';
import { Shift } from '../../../models/shift.model';
import { ShiftService } from '../../../services/shift.service';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { DoctorManagementService } from '../../services/doctor-management.service';

@Component({
  selector: 'doctor-workload',
  templateUrl: './workload.component.html',
  styleUrls: ['./workload.component.scss']
})
export class WorkloadComponent implements OnInit {

  doctorId!: number;
  doctor!: Doctor;
  currentDate: Date = new Date();

  chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
  };
  chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  chartType: ChartType = "line";
  chartLegend = false;
  chartData = [
    { data: Array<any>(), label: 'Regular shifts', cubicInterpolationMode: 'monotone', borderColor: '#66A182' },
    { data: Array<any>(), label: 'On-call shifts', cubicInterpolationMode: 'monotone', borderColor: '#214975' }
  ];
  shifts: Shift[] = [];
  onCallShifts: OnCallShift[] = [];
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;


  constructor(private doctorManagementService: DoctorManagementService, private datepipe: DatePipe, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.doctorId = parseInt(params['id']);
      this.doctorManagementService.getDoctor(this.doctorId).subscribe(
        data => {
          this.doctor = data;
        }
      );
      var firstDateInYear = new Date(new Date().getFullYear(), 0, 1);
      var lastDateInYear = new Date(new Date().getFullYear(), 11, 31);
      this.doctorManagementService.getOnCallShiftsInDateRange(this.datepipe.transform(firstDateInYear, 'yyyy-MM-dd')!, this.datepipe.transform(lastDateInYear, 'yyyy-MM-dd')!).subscribe(
        data => {
          this.onCallShifts = data;
          this.filterOnCallShiftsForGraph();
          this.chart.update();
        }
      );
    });
  }


  filterShiftsForGraph() {
    for (let month = 0; month < 12; month++) {
      var firstDateInMonth = new Date(new Date().getFullYear(), month, 1);
      var lastDateInMonth = new Date(new Date().getFullYear(), month + 1, 0);
      var shiftsWorkedCount = 0;
      for (let shift of this.shifts) {
        if (new Date(shift.start) > firstDateInMonth && new Date(shift.end) < lastDateInMonth) {
          shiftsWorkedCount += 1;
        }
      }
      this.chartData[0].data.push(shiftsWorkedCount);
    }
  }

  filterOnCallShiftsForGraph() {
    for (let month = 0; month < 12; month++) {
      var firstDateInMonth = new Date(new Date().getFullYear(), month, 1);
      var lastDateInMonth = new Date(new Date().getFullYear(), month + 1, 0);
      var onCallShiftsWorkedCount = 0;
      for (let onCallShift of this.onCallShifts) {
        if (onCallShift.doctorId == this.doctorId) {
          if (new Date(onCallShift.start) > firstDateInMonth && new Date(onCallShift.start) < lastDateInMonth) {
            onCallShiftsWorkedCount += 1;
          }
        }
      }
      this.chartData[1].data.push(onCallShiftsWorkedCount);
    }
  }

}
