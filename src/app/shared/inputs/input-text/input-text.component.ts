import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnChanges {

  @Input() value: string = '';
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() hasError: boolean = true;
  @Input() showIcon: boolean = false;
  @Input() disabled: boolean = false;

  @Output() valueEvent = new EventEmitter<string>();

  controlValue: FormControl = new FormControl<string>(this.value);

  static nextId = 0;
  componentId: number;

  constructor() {
    this.componentId = InputTextComponent.nextId++;
  }

  /**
   * The ngOnChanges function sets the control value to the current value, and
   * validates the state and error.
   * @param {SimpleChanges} changes - The `changes` parameter is an object of type `SimpleChanges` that
   * contains the changes detected in the input properties of the component. It is used in the
   * `ngOnChanges` lifecycle hook to perform actions based on the changes detected.
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.controlValue.setValue(this.value);
    this.validateState();
    this.validateError();
  }

  /**
   * The function checks if the "disabled" property is true and disables the "controlValue" if it is,
   * otherwise it enables it.
   */
  validateState() {
    if (this.disabled) {
      this.controlValue.disable();
    } else {
      this.controlValue.enable();
    }
  }

  /**
   * The function `validateError()` toggles the CSS classes of an element with the id 'inputText' based
   * on the value of the variable `hasError`.
   */
  validateError() {
    if(this.hasError) {
      document.getElementById('inputText'+this.componentId)?.classList.replace('ng-valid', 'ng-invalid');
      document.getElementById('inputText'+this.componentId)?.classList.add('ng-dirty');
    } else {
      document.getElementById('inputText'+this.componentId)?.classList.replace('ng-invalid', 'ng-valid');
      document.getElementById('inputText'+this.componentId)?.classList.remove('ng-dirty');
    }
  }

  /**
   * The sendValue function emits the value of the controlValue property.
   */
  sendValue() {
    this.valueEvent.emit(this.controlValue.value);
  }

}
