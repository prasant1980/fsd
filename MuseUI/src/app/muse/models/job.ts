import { Company } from './company';
import { Location } from '@angular/common';

export class Job{

    id : number;
    name : string;
    url: string;
	company : Company;
	locations : Array<String>;
	jobCreatedBy : string;
	jobCreationDate :Date;
    bookmark : string;
    isFavorite: boolean;
}