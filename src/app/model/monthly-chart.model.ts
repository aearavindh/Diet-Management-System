export class MonthlyChart{
	
	public email: string;
	public month: string;
	public weight: string;
	public height: string;
	public chest: string;
	public waist: string;
	public shoulders:string;
	public biceps: string;
	public forearm: string;
	public leg: string;
	public thighs: string;
	
	constructor(email: string, month: string, weight: string, height: string, chest: string, waist: string, shoulders: string,
	            biceps: string, forearm: string, leg: string, thighs: string){
					this.email = email;
					this.month = month;
					this.weight = weight;
					this.height = height;
					this.chest = chest;
					this.waist = waist;
					this.shoulders = shoulders;
					this.biceps = biceps;
                    this.forearm = forearm;
                    this.leg = leg;
                    this.thighs = thighs;					
	}
}