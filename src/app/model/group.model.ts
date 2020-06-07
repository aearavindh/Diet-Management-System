import { Batch } from './batch.model';

export class Group{
    public name: string;
	public batch: Batch;
	
	constructor(name: string, batch: Batch){
	    this.name = name;
		this.batch = batch;
	}
}