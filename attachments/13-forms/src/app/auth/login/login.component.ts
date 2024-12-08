import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  input,
  viewChild,
} from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { debounceTime } from "rxjs";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  private form = viewChild.required<NgForm>("form");
  private destroyRef = inject(DestroyRef);
  private sessionStorage1 = sessionStorage;

  constructor() {
    const savedForm = window.localStorage.getItem("saved-login-form");

    if (savedForm) {
      const loadedFormData = JSON.parse(savedForm);
      const savedEmail = loadedFormData.email;
      setTimeout(() => {
        this.form().controls["email"].setValue(savedEmail);
      }, 1);
    }
    afterNextRender(() => {
      const sub = this.form()
        .valueChanges?.pipe(debounceTime(500))
        .subscribe({
          next: (val) => {
            window.localStorage.setItem(
              "saved-login-form",
              JSON.stringify({ email: val.email })
            );
          },
        });
      //unsub logic
      this.destroyRef.onDestroy(() => sub?.unsubscribe());
    });
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }
    console.log("submitting form");
    console.log("ngForm: ", formData);
    console.log("viewChild: ", this.form);

    formData.control;

    const email = formData.form.value.email;
    console.log(email);
    const password = formData.form.value.password;
    console.log(password);

    formData.form.reset();
  }
}
