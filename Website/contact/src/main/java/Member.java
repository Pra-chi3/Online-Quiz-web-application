
public class Member {
 
	private String name,email,feedback;

	public Member() {
		super();
	}

	public Member(String name, String email, String feedback) {
		super();
		this.name = name;
		this.email = email;
		this.feedback = feedback;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}
	
}
