export class FullUser{
    public email: string;
	public role: string;
	public name: string;
	public groupName: string;
	public batchName: string;
	public referralCode: string;
	public code: string;
	public mobile: string;
	
	
	constructor(email: string, role: string, name: string, groupName: string, batchName: string,
	            referralCode: string, code: string, mobile: string){
	    this.email = email;
		this.role = role;
		this.name = name;
		this.groupName = groupName;
		this.batchName = batchName;
		this.referralCode = referralCode;
		this.code = code;
		this.mobile = mobile;
	}
}