--
-- PostgreSQL database dump
--

DROP TABLE LOGIN;
CREATE TABLE LOGIN (
    username character varying(200),
    password character varying(200),
	secret character varying(200),
	PRIMARY KEY (username)
);

INSERT INTO LOGIN(username,password,secret) VALUES('admin','adminPassword','0123456789');
