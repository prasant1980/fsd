package com.stackroute.musemanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.stackroute.musemanager.filter.FsdCorsFilter;

@SpringBootApplication
public class MusemanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MusemanagerApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean<FsdCorsFilter> jwtFilter() {
		final FilterRegistrationBean<FsdCorsFilter> registrationBean = new FilterRegistrationBean<FsdCorsFilter>();
		registrationBean.setFilter(new FsdCorsFilter());
		registrationBean.addUrlPatterns("/api/v1/musemanager/*");
		return registrationBean;
	}

}
