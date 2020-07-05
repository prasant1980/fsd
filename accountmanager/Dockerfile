FROM java:8-jre
WORKDIR usr/src
ENV MYSQL_HOST: localhost
ENV MYSQL_USER: root
ENV MYSQL_PASSWORD: root
ENV MYSQL_DATABASE: sys
ADD ./target/accountmanager-0.0.1-SNAPSHOT.jar /usr/src/accountmanager-0.0.1-SNAPSHOT.jar
RUN chmod +x /usr/src/accountmanager-0.0.1-SNAPSHOT.jar
EXPOSE 8084
ENTRYPOINT ["java","-Xmx200m", "-jar", "/usr/src/accountmanager-0.0.1-SNAPSHOT.jar"]