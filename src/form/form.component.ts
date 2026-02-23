import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormField, form, minLength, required } from '@angular/forms/signals';

interface SignupModel {
	username: string;
	email: string;
	// age: number; // ------------------ 1. / 6.
	// age: number | string; // ------------------ 4.
	age: number | null; // ------------------ 5.
}

@Component({
  selector: 'app-form',
  imports: [CommonModule, FormField, JsonPipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
	protected readonly model = signal<SignupModel>({
		username: '',
		email: '',
		// age: 0, // ------------------ 3.
		// age: '', // ------------------ 5.
		// age: NaN, // ------------------ 7.
		age: null, // ------------------ 8.
	});

	protected readonly form = form(
		this.model, 
		s => {
			required(s.username, { message: 'Please enter a username' });
			minLength(s.username, 3, 
				{ message: 'Your username must be at least 3 characters' });
			required(s.email, { message: 'Please enter an email address' });

			required(s.age, { message: 'Please enter an age' }); // ------------------ 2.
		}
	);

	protected onSubmit(event: Event) {
		event.preventDefault();
		console.log('Form Value:', this.form().value());
	}
}
