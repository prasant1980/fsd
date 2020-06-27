package com.stackroute.accountmanager.aspectj;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/* Annotate this class with @Aspect and @Component */

@Aspect
@Component
public class LoggingAspect {
	Logger log = LoggerFactory.getLogger(LoggingAspect.class);

	/*
	 * Write loggers for each of the methods of Reminder controller, any particular
	 * method will have all the four aspectJ annotation
	 * (@Before, @After, @AfterReturning, @AfterThrowing).
	 */
	@Pointcut("within(com.stackroute.accountmanager.controller.*)")
	protected void loggingOperation() {
	}

	@Before("loggingOperation()")
	public void logBefore(JoinPoint joinPoint) {
		log.info("Started executing : " + joinPoint.getTarget().getClass().getName() + " : "
				+ joinPoint.getSignature().getName() + " with arguments " + Arrays.toString(joinPoint.getArgs()));
	}

	@After("loggingOperation()")
	public void logAfter(JoinPoint joinPoint) {
		log.info("Returned from : " + joinPoint.getTarget().getClass().getName() + " : "
				+ joinPoint.getSignature().getName());
	}

	@AfterReturning(pointcut = "loggingOperation()", returning = "result")
	public void logAfterReturning(JoinPoint joinPoint, Object result) {
		log.info("Exiting from : " + joinPoint.getTarget().getClass().getName() + " : "
				+ joinPoint.getSignature().getName());
	}

	@AfterThrowing(pointcut = "loggingOperation()", throwing = "e")
	public void logAfterThrowing(JoinPoint joinPoint, Throwable e) {
		log.error("An exception has thrown in " + joinPoint.getTarget().getClass().getName() + " : "
				+ joinPoint.getSignature().getName() + " with message " + e.getMessage());
	}

}
