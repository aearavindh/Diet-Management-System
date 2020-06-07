export class DailyLog{
	
	public email: string;
	public date: string;
	public breakfast: string;
	public lunch: string;
	public dinner: string;
	public fruits: string;
	public vegetables: string;
	public workouts: string;
	
	constructor(email: string, date: string, breakfast: string, lunch: string, dinner: string, fruits: string, vegetables: string, workouts: string){
		this.email = email;
		this.date = date;
		this.breakfast = breakfast;
		this.lunch = lunch;
		this.dinner = dinner;
		this.fruits = fruits;
		this.vegetables = vegetables;
		this.workouts = workouts;
	}
}