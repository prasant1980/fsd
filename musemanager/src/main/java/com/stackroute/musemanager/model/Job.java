package com.stackroute.musemanager.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "Job")
public class Job implements Serializable {
	private static final long serialVersionUID = -4216663725940135606L;

	@Id
	private int id;
	private int name;
	private Company company;
	private List<Location> locations;
	private String jobCreatedBy;
	private Date jobCreationDate;
	private String bookmark;
	private boolean isFavorite;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getName() {
		return name;
	}

	public void setName(int name) {
		this.name = name;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public List<Location> getLocations() {
		return locations;
	}

	public void setLocations(List<Location> locations) {
		this.locations = locations;
	}

	public String getJobCreatedBy() {
		return jobCreatedBy;
	}

	public void setJobCreatedBy(String jobCreatedBy) {
		this.jobCreatedBy = jobCreatedBy;
	}

	public Date getJobCreationDate() {
		return jobCreationDate;
	}

	public void setJobCreationDate(Date jobCreationDate) {
		this.jobCreationDate = jobCreationDate;
	}

	public String getBookmark() {
		return bookmark;
	}

	public void setBookmark(String bookmark) {
		this.bookmark = bookmark;
	}

	public boolean isFavorite() {
		return isFavorite;
	}

	public void setFavorite(boolean isFavorite) {
		this.isFavorite = isFavorite;
	}

	@Override
	public String toString() {
		return "Job [id=" + id + ", name=" + name + ", company=" + company + ", locations=" + locations
				+ ", jobCreatedBy=" + jobCreatedBy + ", jobCreationDate=" + jobCreationDate + ", bookmark=" + bookmark
				+ ", isFavorite=" + isFavorite + "]";
	}

}
