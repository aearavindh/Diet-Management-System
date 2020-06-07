export class Challenger {
	
	public program: string;
	public name: string;
	public age: string;
	public gender: string;
	public mobile: string;
	public email: string;
	public address: string;
	public city: string;
	public state: string;
	public country: string;
	public pinCode: string;
	public height: string;
	public weight: string;
	public bmi: string;
	public reason: string;
	public medicalConditions: string;
	public dietaryRestrictions: string;
	public dietaryCustom: string;
	public referralCode: string;
	public pregnantStatus: string;
	public status:string;
	
	constructor(program: string, name: string, age: string, gender: string, mobile: string, email: string,
	            address: string, city: string, state: string, country: string, pinCode: string, height: string,
				weight: string, bmi: string, reason: string, medicalConditions: string, dietaryRestrictions: string,
				dietaryCustom: string, referralCode: string, pregnantStatus: string, status: string){
					this.program = program;
					this.name = name;
					this.age = age;
					this.gender = gender;
					this.mobile = mobile;
					this.email = email;
					this.address = address;
					this.city = city;
					this.state = state;
					this.country = country;
					this.pinCode = pinCode;
					this.height = height;
					this.weight = weight;
					this.bmi = bmi;
					this.reason = reason;
					this.medicalConditions = medicalConditions;
					this.dietaryRestrictions = dietaryRestrictions;
					this.dietaryCustom = dietaryCustom;
					this.referralCode = referralCode;
					this.pregnantStatus = pregnantStatus;
					this.status = status;
	}
}
