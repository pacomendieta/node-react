/* C:/users/fmend/desktop/programs/node-react/node/database/triggers.sql   */
/* C:\Users\fmend\Desktop\PROGRAMS\node-react\node\database */


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
    fecha_creacion DATETIME DEFAULT current_timestamp
);

DROP TABLE IF EXISTS  libros;
CREATE TABLE IF NOT EXISTS libros(
    libro_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    autor_id INT UNSIGNED NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(250),
    fecha_creacion DATETIME DEFAULT current_timestamp,
    fecha_publicacion DATE NOT NULL,
    FOREIGN KEY(autor_id) references autores(autor_id) ON DELETE CASCADE
);

ALTER TABLE autores ADD COLUMN cantidad_libros INT DEFAULT 0;

/* trigger */
/* aumenta autores.cantidad_libros al insertar un libro del autor */
DELIMITER //
CREATE TRIGGER after_insert_libros
AFTER INSERT ON libros
FOR EACH ROW
BEGIN
    UPDATE autores SET cantidad_libros = cantidad_libros +1 WHERE autor_id = NEW.autor_id;
END;
DELIMITER ;