package cs157a;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	private String userName;
	private String userPass;
	
	//GETTER
	public String getUserName() { return userName; }
	public String getUserPass() { return userPass; }
	public Integer getId() {	return id;}
	
	
	//SETTER
	public void setName(String name) { this.userName = name;}
	public void setPass(String pass) { this.userPass = pass;}
	
}
