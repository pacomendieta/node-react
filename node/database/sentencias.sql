CREATE DATABASE IF NOT EXISTS midatabase;
USE midatabase;
DROP TABLE IF EXISTS  libros;
DROP TABLE IF EXISTS autores;

CREATE TABLE IF NOT EXISTS autores(
    autor_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(25) NOT NULL,
    apellidos VARCHAR(25),
    pseudonimo VARCHAR(25) UNIQUE,
    CONSTRAINT nombrecompleto UNIQUE(nombre, apellidos),
    edad INT(3),
    genero ENUM('M','F'),
    fecha_nacimiento DATE,  
    pais_origen VARCHAR(40) character set utf8,
    ciudad_origen CHAR(25),
    fecha_creacion DATETIME DEFAULT current_timestamp
);


CREATE TABLE IF NOT EXISTS libros(
    libro_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    autor_id INT UNSIGNED NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(250),
    fecha_creacion DATETIME DEFAULT current_timestamp,
    FOREIGN KEY(autor_id) references autores(autor_id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS usuarios;
CREATE TABLE IF NOT EXISTS usuarios(
    user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(25) NOT NULL,
    apellidos VARCHAR(25)
);

INSERT INTO usuarios ( nombre, apellidos ) 
VALUES 
  ( "Usuario 1", "Test apellido 2"),
  ( "Usuario 2", "Test apellido 3"),
  ( "Usuario 3", "Test apellido 4"),
  ( "Usuario 4", "Test apellido 5");




INSERT INTO autores ( nombre, apellidos,fecha_nacimiento) 
VALUES 
  ( "Test autor 1", "Test apellido 2","2020-02-19"),
  ( "Test autor 2", "Test apellido 3","2020-03-19"),
  ( "Test autor 3", "Test apellido 4","2020-04-19"),
  ( "Test autor 4", "Test apellido 5","2020-04-19");


INSERT INTO libros ( autor_id, titulo) 
VALUES 
  ( 1, "Libro de autor 1"),
  ( 1, "Segundo libro de autor 1"),
  ( 2, "Libro de autor 2"),
  ( 2, "Segundo libro de autor 2"),
  ( 1, "Libro de autor 1"),
  ( 1, "Segundo libro de autor 1"),
  ( 2, "Libro de autor 2"),
  ( 2, "Segundo libro de autor 2"),
  ( 1, "Libro de autor 1"),
  ( 1, "Segundo libro de autor 1"),
  ( 2, "Libro de autor 2"),
  ( 2, "Segundo libro de autor 2"),
  ( 1, "Libro de autor 1"),
  ( 1, "Segundo libro de autor 1"),
  ( 4, "Libro de autor 2"),
  ( 4, "Segundo libro de autor 2");


ALTER TABLE libros ADD ventas INT UNSIGNED DEFAULT 0;
ALTER TABLE libros DROP COLUMN ventas;
ALTER TABLE usuarios RENAME users;
ALTER TABLE autores MODIFY apellidos VARCHAR(10);
ALTER TABLE autores RENAME COLUMN apellidos apellido;
ALTER TABLE libros DROP FOREIGN KEY autor_id
ALTER TABLE libros ADD FOREIGN KEY(autor_id) REFERENCES autores(autor_id)


await sequelize.query(
  'SELECT * FROM users WHERE name LIKE :search_name',
  {
    replacements: { search_name: 'ben%' },
    type: QueryTypes.SELECT
  }
);

UPDATE libros SET descripcion = 'Nueva desc', ventas=100 WHERE autor=1
DELETE FROM libros;

CREATE FUNCTION agregar_dias(fecha DATE, dias INT) 
RETURNS DATE
BEGIN
     RETURN fecha + INTERVAL dias DAY;
END //


SELECT name FROM mysql.proc WHERE db=database() AND type = 'FUNCTION';

/* Listar funciones custom de midatabase */
SELECT 
    routine_name, 
    routine_type, 
    data_type 
FROM 
    information_schema.routines 
WHERE 
    routine_schema = 'midatabase' AND 
    routine_type = 'FUNCTION';

-- OTRA FUNCION
CREATE FUNCTION obtener_paginas()
RETURNS INT
BEGIN
    SET @paginas=  (SELECT (ROUND (RAND()*100 ) * 4) );
    RETURN @paginas;
END //


INSERT INTO LIBROS (TITULO, AUTOR_ID)
    VALUES 
    ("Señor de los anillos", 1), 
    ("Seños de los ANILLOS",1), 
    ("Anillos del señor",1);


SELECT * FROM LIBROS WHERE TITULO LIKE '%ANILLOS';

SELECT * FROM libros WHERE titulo REGEXP '^S' ORDER BY titulo, paginas DESC;

 SELECT * FROM libros WHERE titulo REGEXP '^S' ORDER BY titulo, paginas DESC;

 select nombre from autores UNION select titulo from libros;

  select nombre,"" as paginas from autores UNION select titulo,paginas from libros;

set @promedio = (SELECT AVG(ventas) FROM libros);

select autor_id FROM libros GROUP BY autor_id 
HAVING SUM(ventas) > (SELECT AVG(ventas) FROM libros);

SELECT nombre, apellidos FROM autores 
WHERE autor_id IN 
( 
select autor_id FROM libros GROUP BY autor_id 
HAVING SUM(ventas) > (SELECT AVG(ventas) FROM libros)
);

SELECT IF(
    EXISTS (SELECT libro_id FROM libros WHERE titulo REGEXP '^S' ),
       "Si existe",
       "No Existe"
) 
AS existe


SELECT libros.titulo, autores.nombre FROM libros INNER JOIN autores ON libros.autor_id = autores.autor_id;

SELECT libros.titulo, autores.nombre FROM libros INNER JOIN autores USING(autor_id);

SELECT autores.nombre FROM autores
LEFT JOIN autores_libros ON autores.autor_id = autores_libros.autor_id

SELECT autores.nombre FROM autores_libros
RIGHT JOIN autores ON autores.autor_id = autores_libros.autor_id

SELECT DISTINCT nombre FROM autores
INNER JOIN autores_libros ON autores.autor_id = libros.autor_id

select libro_id, autores.autor_id from libros CROSS JOIN autores;

-- Autores con su total de libros
SELECT 
   autores.autor_id,
   autores.nombre,
   COUNT(autores.autor_id) AS total_libros
FROM autores
INNER JOIN libros ON autores.autor_id = libros.autor_id
GROUP BY autores.autor_id

--Crear VISTA con consulta Autores - total libros
CREATE VIEW libros_autores_vw AS 
SELECT 
   autores.autor_id,
   autores.nombre,
   COUNT(autores.autor_id) AS total_libros
FROM autores
INNER JOIN libros ON autores.autor_id = libros.autor_id
GROUP BY autores.autor_id;


--Crear PROCEDIMIENTO ALMACENADO
CREATE PROCEDURE prestamos(user_id INT, libro_id INT, OUT cantidad INT) 
BEGIN 
    CREATE TABLE IF NOT EXISTS usuarios_libros(
        libro_id INT UNSIGNED,
        user_id  INT UNSIGNED,
        FOREIGN KEY(libro_id) references libros(libro_id),
        FOREIGN KEY(user_id) references usuarios(user_id)
    );
    INSERT INTO usuarios_libros (libro_id, user_id) VALUES (libro_id, user_id);
    SET cantidad = 0;
    IF cantidad = 0 OR cantidad = 100 THEN
        SELECT "Hay un error. ¿Esto sale en consola?" AS mensaje_error;
    ELSE
        SET cantidad = cantidad + 1;
    END IF;
END

    
/* Listar procedimientos almacenaos */
SELECT 
    routine_name, 
    routine_type, 
    data_type 
FROM 
    information_schema.routines 
WHERE 
    routine_schema = 'midatabase' AND 
    routine_type = 'PROCEDURE';


CALL prestamos(1,2)

BEGIN
    SET @contador=0
    WHILE @contador < 5 DO 
        SET @contador = @contador +1
    END WHILE
END


START TRANSACTION ;
    -- OPERACIONES
    IF error THEN
        ROLLBACK;
    END IF 
COMMIT ;



CREATE PROCEDURE prestamos(user_id INT, libro_id INT, OUT cantidad INT) 
BEGIN 

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- codigo a realizar si error
        ROLLBACK;
    END

    START TRANSACTION;
        INSERT INTO usuarios_libros (libro_id, user_id) VALUES (libro_id, user_id);
        SET cantidad = 0;
        IF cantidad = 0 OR cantidad = 100 THEN
            SELECT "Hay un error. ¿Esto sale en consola?" AS mensaje_error;
        ELSE
            SET cantidad = cantidad + 1;
        END IF;
    COMMIT;
END


/**  EVENTOS ***/
DELIMITER //

CREATE EVENT insertion_event
ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 MINUTE
ON COMPLETION PRESERVE
...
DO
BEGIN
 INSERT INTO test VALUES ('Evento 1', NOW());
 INSERT INTO test VALUES ('Evento 2', NOW());
 INSERT INTO test VALUES ('Evento 3', NOW());
 
END //

DELIMITER ;

CREATE EVENT nombre_evento
ON SCHEDULE AT 'fecha de ejeución' 
DO
CALL store_procedure();

CREATE EVENT insertion_event
ON SCHEDULE EVERY 1 MINUTE STARTS '2018-07-07 18:30:00'
DO INSERT INTO test VALUES ('Evento 1', NOW());


CREATE EVENT insertion_event
ON SCHEDULE EVERY 1 MINUTE STARTS '2018-07-07 18:30:00'
ENDS '2018-07-07 19:00:00'
DO INSERT INTO test VALUES ('Evento 1', NOW());

ALTER EVENT nombre_evento
DISABLE;



CREATE
    [DEFINER = { user | CURRENT_USER }]
    EVENT
    [IF NOT EXISTS]
    event_name
    ON SCHEDULE schedule
    [ON COMPLETION [NOT] PRESERVE]
    [ENABLE | DISABLE | DISABLE ON SLAVE]
    [COMMENT 'string']
    DO event_body;

schedule:
    AT timestamp [+ INTERVAL interval] ...
  | EVERY interval
    [STARTS timestamp [+ INTERVAL interval] ...]
    [ENDS timestamp [+ INTERVAL interval] ...]

interval:
    quantity {YEAR | QUARTER | MONTH | DAY | HOUR | MINUTE |
              WEEK | SECOND | YEAR_MONTH | DAY_HOUR | DAY_MINUTE |
              DAY_SECOND | HOUR_MINUTE | HOUR_SECOND | MINUTE_SECOND}


mysqldump base_de_datos > ruta/archivo_respaldo.sql
mysqldump --databases db1 db2 db3 > ruta/archivo_respaldo.sql
mysqldump base_de_datos tabla1 > ruta/archivo_respaldo.sql
mysqldump base_de_datos tabla1 tabla3 > ruta/archivo_respaldo.sql