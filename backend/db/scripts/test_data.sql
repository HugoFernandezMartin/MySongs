INSERT INTO users (username, password_hash, profile_picture, is_admin) VALUES
('hugo_dev', 'hash123', 'avatars/hugo.png', false),
('maria98', 'hash456', 'avatars/maria.jpg', false),
('coder_john', 'hash789', NULL, false),
('sara_music', 'hash321', 'avatars/sara.png', false),
('alex99', 'hash654', NULL, false);

INSERT INTO authors (name, description) VALUES
('The Synth Lords', 'Electronic synthwave duo from Sweden'),
('Rocking Rebels', 'Classic rock band formed in 1990'),
('DJ Nova', 'EDM and house music producer'),
('Luna Rivera', 'Indie singer-songwriter from Spain'),
('Orchestra Maxima', 'Symphonic orchestra with modern influences');

INSERT INTO genres (name, description) VALUES
('Rock', 'Electric guitars and powerful drums'),
('Pop', 'Mainstream catchy melodies'),
('Electronic', 'Synths, beats, and digital sounds'),
('Classical', 'Orchestral and instrumental works'),
('Indie', 'Independent music, often experimental');

INSERT INTO albums (title, release_date) VALUES
('Neon Dreams', '2022-05-10'),
('Back to the 90s', '2021-11-20'),
('House Beats Vol.1', '2023-03-15'),
('Moonlight Stories', '2020-09-05'),
('Symphony of the Future', '2024-01-30');

INSERT INTO songs (title, author_id, genre_id, album_id, release_date) VALUES
('Starlight Drive', 1, 3, 1, '2022-05-10'),
('Rebel Yell', 2, 1, 2, '2021-11-20'),
('Midnight Drop', 3, 3, 3, '2023-03-15'),
('Shadows in the Rain', 4, 5, 4, '2020-09-05'),
('Future Overture', 5, 4, 5, '2024-01-30');

INSERT INTO playlists (title, owner_id) VALUES
('Workout Vibes', 1),
('Chill Evenings', 2),
('Party Mode', 3),
('Indie Mix', 4),
('Classical Focus', 5);

INSERT INTO songs_playlists (playlist_id, song_id) VALUES
(1, 1), -- Workout Vibes -> Starlight Drive
(1, 2), -- Workout Vibes -> Rebel Yell
(2, 4), -- Chill Evenings -> Shadows in the Rain
(3, 3), -- Party Mode -> Midnight Drop
(5, 5); -- Classical Focus -> Future Overture

