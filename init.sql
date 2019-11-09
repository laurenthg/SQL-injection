--
-- PostgreSQL database dump
--

DROP TABLE LOGIN;
DROP TABLE LOGINCRYPTO;
CREATE TABLE LOGIN (
    username character varying(2000),
    password character varying(2000),
	secret character varying(2000),
	PRIMARY KEY (username)
);
CREATE TABLE LOGINCRYPTO (
    username character varying(2000),
    password character varying(2000),
	secret character varying(2000),
	PRIMARY KEY (username)
);

INSERT INTO LOGIN(username,password,secret) VALUES('admin','adminPassword','0123456789'); -- username admin / password adminPassword
INSERT INTO LOGINCRYPTO(username,password,secret) VALUES('8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','0738a3e2111e114a665d35b24be5f42d1f98700f161633f63fbaa15b4b3103ab','b61afd899aa3073f4733d4aa994bb4e656362e21464dd9c19398d5bcd02bde163ginaSbFVZU0mpgYi24uNw=='); -- username admin / password adminPassword
