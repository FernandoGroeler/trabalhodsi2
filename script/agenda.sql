CREATE TABLE public.agenda
(
    id serial NOT NULL,
    contato character varying(255),
    nome character varying(255),
    telefonefixo character varying(100),
    endereco character varying(255),
    email character varying(255),
    celular character varying(100),
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.agenda
    OWNER to postgres;