export class Message{
	
    public date: string;
	public to: string;
	public fromUser: string;
	public message: string;
	
	constructor(date: string, to: string, fromUser: string, message: string){
	    this.date = date;
		this.to = to;
		this.fromUser = fromUser;
		this.message = message;
	}
}