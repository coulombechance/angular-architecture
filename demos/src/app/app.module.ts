import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { routes } from './routes';
import { PlanningModule } from './planning/planning.module';
import { StructuringComponentsModule } from './structuring-components/structuring-components.module';
import { CoreModule } from './core/core.module';
import { CommunicationModule } from './communication/communication.module';
import { ViewModelModule } from './view-model/view-model.module';
import { PipesFunctionsModule } from './pipes-functions/pipes-functions.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ComponentInheritanceModule } from './component-inheritance/component-inheritance.module';
import { HttpClientRxJSModule } from './httpClientRxJS/httpClientRxJS.module';
import { RouterModule } from '@angular/router';
import { SignalsModule } from './signals/signals.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule.forRoot(routes),
    PlanningModule,
    StructuringComponentsModule,
    PipesFunctionsModule,
    CommunicationModule,
    ViewModelModule,
    SubjectsModule,
    ComponentInheritanceModule,
    HttpClientRxJSModule,
    SignalsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
