import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe, TitleCasePipe } from "@angular/common";

import { ImagePipe } from './image.pipe';
import { YoutubePipe } from './youtube.pipe';
import { DateDayPipe } from './date-day.pipe';
import { SpecialityPipe } from "./speciality.pipe";
import { ImageServicesPipe } from './image-service.pipe';
import { DocumentShortPipe } from "./document-short.pipe";
import { CoverPageImagePipe } from './cover-page-image.pipe';
import { DepartmentAndTownPipe } from "./departmentAndTown.pipe";
import { CapitalCasePipe } from "./capitalCase.pipe";
import { PercentPricePipe } from './percent-price.pipe';
import { SepareWordsPipe } from "./separeWords.pipe";
import { HideDataPipe } from './hide-data.pipe';
import { HorasPipe } from './hora.pipe';

const listPipes = [
    ImagePipe,
    DateDayPipe,
    YoutubePipe,
    HideDataPipe,
    HorasPipe,
    SpecialityPipe,
    CapitalCasePipe,
    SepareWordsPipe,
    PercentPricePipe,
    ImageServicesPipe,
    DocumentShortPipe,
    CoverPageImagePipe,
    DepartmentAndTownPipe
]

@NgModule({
    declarations: [...listPipes, HideDataPipe],
    providers: [DecimalPipe, TitleCasePipe],
    imports: [CommonModule],
    exports: [...listPipes]
})
export class PipesModule { }