package com.stackroute.musemanager.model;

import java.io.Serializable;

public class Location implements Serializable {
	private static final long serialVersionUID = -6779021517667843632L;

	private String name;

	public Location() {
		super();
	}

	public Location(String name) {
		super();
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Location [name=" + name + "]";
	}

}
