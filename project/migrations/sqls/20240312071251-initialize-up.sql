/* Replace with your SQL commands */
DELETE FROM movies WHERE title='test123';
SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies));