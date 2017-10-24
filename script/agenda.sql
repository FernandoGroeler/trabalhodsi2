CREATE TABLE agenda (
	id SERIAL PRIMARY KEY,
	contato VARCHAR(255),
    nome VARCHAR(255),
	telefonefixo VARCHAR(100),
	endereco VARCHAR(255),
	email VARCHAR(255),
    celular VARCHAR(100)
);