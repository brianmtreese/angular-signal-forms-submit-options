import { ChangeDetectionStrategy, Component, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormField, FormRoot, debounce, form, minLength, required, validateAsync } from '@angular/forms/signals';

interface SignupModel {
	username: string;
}

@Component({
  selector: 'app-form',
  imports: [CommonModule, FormField, FormRoot],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
	protected readonly model = signal<SignupModel>({
		username: ''
	});

	protected readonly form = form(
		this.model, 
		s => {
			required(s.username, { message: 'Please enter a username' });
			minLength(s.username, 3, 
				{ message: 'Your username must be at least 3 characters' });
			validateAsync(s.username, {
				params: ({ value }) => {
					const val = value();
					if (!val || val.length < 3) {
						return undefined;
					}
					return val;
				},
				factory: params =>
					resource({
						params,
						loader: async ({ params }) => {
							const username = params;
							const available = await this.checkUsernameAvailability(username);
							return available;
						}
					}),
				onSuccess: (result: boolean) => {
					if (result === false) {
						return {
							kind: 'username_taken',
							message: 'This username is already taken'
						}
					}
					return null;
				},
				onError: (error: unknown) => {
					console.error('Validation error:', error);
					return null;
				}
			});
			debounce(s.username, 300);
		},
		{
			submission: {
				ignoreValidators: 'all',
				action: async form => {
					console.log('Form Value:', form().value());
					await new Promise(resolve => setTimeout(resolve, 1500));
				},
				onInvalid: (field, detail) => {
					const first = detail.root().errorSummary()?.[0];
					first?.fieldTree()?.focusBoundControl?.();
				}
			}
		}
	);

	private checkUsernameAvailability(username: string): Promise<boolean> {
		return new Promise(resolve => {
			setTimeout(() => {
				const taken = ['admin', 'test', 'brian'];
				resolve(!taken.includes(username.toLowerCase()));
			}, 5000);
		});
	}
}
