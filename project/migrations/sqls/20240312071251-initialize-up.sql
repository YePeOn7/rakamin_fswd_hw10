/* Replace with your SQL commands */
CREATE SEQUENCE IF NOT EXISTS users_id_seq;
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
ALTER TABLE IF EXISTS users
    ALTER COLUMN id SET DEFAULT NEXTVAL('users_id_seq'),
    ALTER COLUMN password TYPE VARCHAR(255);
    
DELETE FROM movies WHERE title='test123';
SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies));
ALTER TABLE IF EXISTS movies  
    ALTER COLUMN photo TYPE VARCHAR(255);