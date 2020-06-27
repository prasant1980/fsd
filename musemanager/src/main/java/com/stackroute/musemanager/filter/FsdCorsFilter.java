package com.stackroute.musemanager.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class FsdCorsFilter extends GenericFilterBean {
	Logger log = LoggerFactory.getLogger(FsdCorsFilter.class);

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
			throws IOException, ServletException {
		final HttpServletRequest request = (HttpServletRequest) servletRequest;
		final HttpServletResponse response = (HttpServletResponse) servletResponse;
		final String authHeader = request.getHeader("authorization");
		log.info("Before OPTIONS : " + request.getMethod());

		// Authorize (allow) all domains to consume the content
		((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Origin", "*");
		((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Methods",
				"GET, OPTIONS, HEAD, PUT, POST,DELETE");
		((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Headers", "*");

		if ("OPTIONS".equals(request.getMethod())) {
//			response.setStatus(HttpServletResponse.SC_OK);
			response.setStatus(HttpServletResponse.SC_ACCEPTED);
			log.info("Giing to Filter chain : " + request);
			chain.doFilter(request, response);
		} else {
			if (null == authHeader || !authHeader.startsWith("Bearer")) {
				throw new ServletException("Missing or invalid Authorization header");
			}

			final String token = authHeader.substring(7);
			final Claims claims = Jwts.parser().setSigningKey("keepnote").parseClaimsJws(token).getBody();
			request.setAttribute("claims", claims);
			chain.doFilter(request, response);
		}
	}
}