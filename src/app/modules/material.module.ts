import {NgModule} from '@angular/core';
import {
	MAT_DIALOG_DATA,
	MatButtonModule,
	MatCardModule,
	MatDialogModule, MatDialogRef,
	MatFormFieldModule, MatIconModule,
	MatInputModule,
	MatSnackBarModule,
	MatTableModule,
	MatTooltipModule,
	MatTreeModule
} from '@angular/material';

@NgModule({
	declarations: [],
	imports: [
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatSnackBarModule,
		MatTableModule,
		MatDialogModule,
		MatIconModule,
		MatTooltipModule,
		MatTreeModule
	],
	exports: [
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatSnackBarModule,
		MatTableModule,
		MatDialogModule,
		MatIconModule,
		MatTooltipModule,
		MatTreeModule
	],
	providers: [
		{provide: MAT_DIALOG_DATA, useValue: ''},
		{provide: MatDialogRef, useValue: ''}
	]
})
export class MaterialModule {
}
