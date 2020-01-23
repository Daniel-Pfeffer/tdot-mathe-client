import {Component} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {DialogComponent} from '../dialog/dialog.component';
import {DataService} from '../../services/data.service';


@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent {

	// validator manager
	form: FormGroup;

	// validator types

	constructor(
		private dialog: MatDialog,
		private fb: FormBuilder,
		private data: DataService) {
		this.form = fb.group({
			name: ['', Validators.required]
		});
		data.config.types.forEach(item => {
			const valArray: Array<ValidatorFn> = [Validators.required];
			if (item.type === 'number') {
				valArray.push(Validators.pattern(/^[0-9]*$/));
			}
			this.form.addControl(item.shortName, new FormControl('', valArray));
		});
	}

	onSubmit() {
		const val = this.form.value;
		const dialogRef = this.dialog.open(DialogComponent, {
			data: val,
			width: '600px'
		});
		dialogRef.afterClosed().subscribe(_ => {
			this.form.reset();
		});
	}
}
