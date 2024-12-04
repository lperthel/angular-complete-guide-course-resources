import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent {
  @ViewChild('appButton') button?: ElementRef<ButtonComponent>;
  @ViewChild('form') form?: ElementRef<NgForm>;
  @ViewChildren(ButtonComponent) buttons?: QueryList<ButtonComponent>;

  onSubmit2(formData: NgForm) {
    formData.form.controls['email'];
  }

  onSubmit(title: HTMLInputElement, button: ButtonComponent) {
    this.form?.nativeElement.controls['email'];
    this.form?.nativeElement.reset();
  }
}
