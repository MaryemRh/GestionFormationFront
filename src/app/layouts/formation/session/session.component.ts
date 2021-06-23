import { Component, OnInit } from '@angular/core';
import { SchedulerEvent, CreateFormGroupArgs } from '@progress/kendo-angular-scheduler';

import { EditMode } from '@progress/kendo-angular-scheduler'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import '@progress/kendo-date-math/tz/regions/Europe';
import '@progress/kendo-date-math/tz/regions/NorthAmerica';
import '@progress/kendo-date-math/tz/regions/Europe';
import '@progress/kendo-date-math/tz/regions/NorthAmerica';



@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {


  public selectedDate: Date = new Date('2018-10-22T00:00:00');
  public formGroup: FormGroup;
  public events: SchedulerEvent[] = [{
      id: 1,
      title: 'Breakfast',
      start: new Date('2018-10-22T09:00:00'),
      end: new Date('2018-10-22T09:30:00'),
      recurrenceRule: 'FREQ=DAILY;COUNT=5;'
  }];

  
  constructor(private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
}
  ngOnInit(): void {
  }

public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const dataItem = args.dataItem;
    const isOccurrence = args.mode === EditMode.Occurrence;
    const exceptions = isOccurrence ? [] : dataItem.recurrenceExceptions;

    this.formGroup = this.formBuilder.group({
        'id': args.isNew ? this.getNextId() : dataItem.id,
        'start': [dataItem.start, Validators.required],
        'end': [dataItem.end, Validators.required],
        'startTimezone': [dataItem.startTimezone],
        'endTimezone': [dataItem.endTimezone],
        'isAllDay': dataItem.isAllDay,
        'title': dataItem.title,
        'description': dataItem.description,
        'recurrenceRule': dataItem.recurrenceRule,
        'recurrenceId': dataItem.recurrenceId,
        'recurrenceExceptions': [exceptions]
    });

    return this.formGroup;
}

public isEditingSeries(editMode: EditMode): boolean {
    return editMode === EditMode.Series;
}

public getNextId(): number {
    const len = this.events.length;

    return (len === 0) ? 1 : this.events[this.events.length - 1].id + 1;
}
}
