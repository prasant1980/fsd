package com.stackroute.musemanager.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.stackroute.musemanager.exception.JobAlreadyExistsException;
import com.stackroute.musemanager.exception.JobNotFoundException;
import com.stackroute.musemanager.model.Job;
import com.stackroute.musemanager.model.JobUser;
import com.stackroute.musemanager.repository.MuseRepository;

@Service
public class MuseServiceImpl implements MuseService{
	private MuseRepository museRepository;
	
	@Autowired
	JobUserSequenceService jobUserSequenceService;
	
	@Autowired
	public MuseServiceImpl(MuseRepository museRepository) {
		super();
		this.museRepository = museRepository;
	}

	@Override
	public boolean saveJobToWishList(Job job) throws JobAlreadyExistsException {
		boolean insertSuccess = false;
		List<Job> jobList = new ArrayList<>();
		job.setFavorite(true);
		jobList.add(job);
		JobUser jobUser = museRepository.findByUserId(job.getJobCreatedBy());
		if (jobUser != null) {
			Job model = jobUser.getJobs().stream().filter(m -> job.getId() == m.getId()).findAny().orElse(null);

			if (model == null) {
				jobUser.getJobs().addAll(jobList);
				museRepository.save(jobUser);
				insertSuccess = true;
			} else {
				if (model.isFavorite()) {
					insertSuccess = false;
					throw new JobAlreadyExistsException("Job Already exists..");
				} else {
					if (job.isFavorite()) {
						int index = jobUser.getJobs().indexOf(model);
						jobUser.getJobs().remove(index);
						jobUser.getJobs().addAll(jobList);
						museRepository.save(jobUser);
						insertSuccess = true;
					}
				}
			}
		} else {
			JobUser gifuser = new JobUser();
			gifuser.setId(jobUserSequenceService.getNextSequence("jobUserSequence"));
			gifuser.setUserId(job.getJobCreatedBy());
			gifuser.setJobs(jobList);
			museRepository.insert(gifuser);
			insertSuccess = true;
		}

		return insertSuccess;
	}

	@Override
	public boolean deleteJobFromWishList(String userId, int id) throws JobNotFoundException {
		JobUser jobUser = museRepository.findByUserId(userId);
		List<Job> list = new ArrayList<Job>();
		if (jobUser.getJobs() != null) {
			for (Job job : jobUser.getJobs()) {
				if (job.getId() != id) {
					list.add(job);
				} else {
					if (!StringUtils.isEmpty(job.getBookmark())) {
						job.setFavorite(false);
						list.add(job);
					}
				}
			}
			jobUser.setJobs(list);
			museRepository.save(jobUser);
			return true;
		}

		return false;
	}

	@Override
	public List<Job> getAllJobFromWishList(String userId) throws Exception {
		List<Job> list = new ArrayList<Job>();
		JobUser jobUser = museRepository.findByUserId(userId);
		if (jobUser != null) {
			list = jobUser.getJobs().stream().filter(m -> m.isFavorite()).collect(Collectors.toList());
		}

		return list;
	}

	@Override
	public List<Job> getAllBookMarkedJob(String userId) throws Exception {
		List<Job> list = new ArrayList<Job>();
		JobUser jobUser = museRepository.findByUserId(userId);
		if (jobUser != null) {
			list = jobUser.getJobs().stream().filter(m -> m.getBookmark() != null || m.getBookmark() != "")
					.collect(Collectors.toList());
		}

		return list;
	}

	@Override
	public boolean updateBookmark(Job job, String userId, int id) {
		boolean insertSuccess = false;
		List<Job> jobList = new ArrayList<>();
		jobList.add(job);
		JobUser jobUser = museRepository.findByUserId(job.getJobCreatedBy());
		if (jobUser != null) {
			Job model = jobUser.getJobs().stream().filter(m -> job.getId() == m.getId()).findAny().orElse(null);
			if (model == null) {
				if (!StringUtils.isEmpty(job.getBookmark())) {
					jobUser.getJobs().addAll(jobList);
					museRepository.save(jobUser);
					insertSuccess = true;
				}
			} else {
				int index = jobUser.getJobs().indexOf(model);
				if (!StringUtils.isEmpty(job.getBookmark())) {
					jobUser.getJobs().remove(index);
					jobUser.getJobs().addAll(jobList);
					museRepository.save(jobUser);
					insertSuccess = true;
				} else {
					// Remove as bookmark value is null or empty
					if (!job.isFavorite()) {
						jobUser.getJobs().remove(index);
					} else {
						jobUser.getJobs().get(index).setBookmark(null);
					}
					museRepository.save(jobUser);
				}
			}

		} else {
			if (StringUtils.isEmpty(job.getBookmark())) {
				JobUser gifuser = new JobUser();
				gifuser.setId(jobUserSequenceService.getNextSequence("jobUserSequence"));
				gifuser.setUserId(job.getJobCreatedBy());
				gifuser.setJobs(jobList);
				museRepository.insert(gifuser);
				insertSuccess = true;
			}
		}

		return insertSuccess;
	}

}
