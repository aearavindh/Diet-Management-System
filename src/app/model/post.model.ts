export class Post{
	
    public date: string;
	public to: string;
	public fromUser: string;
	public message: string;
	public file: any;
	
	constructor(date: string, to: string, fromUser: string, message: string, file: any){
	    this.date = date;
		this.to = to;
		this.fromUser = fromUser;
		this.message = message;
		this.file = file;
	}
}