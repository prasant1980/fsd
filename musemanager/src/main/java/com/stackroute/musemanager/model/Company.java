package com.stackroute.musemanager.model;

import java.io.Serializable;

import javax.persistence.Id;

public class Company implements Serializable {
	private static final long serialVersionUID = -8006593433095798361L;

	@Id
	private int id;
	private String name;

	public Company() {
		super();
	}

	public Company(int id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Company [id=" + id + ", name=" + name + "]";
	}

}
