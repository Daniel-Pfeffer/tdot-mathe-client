import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogComponent} from './components/dialog/dialog.component';
import {MainComponent} from './components/main/main.component';
import {MaterialModule} from './modules/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './services/data.service';

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		DialogComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule
	],
	entryComponents: [
		DialogComponent
	],
	providers: [DataService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
