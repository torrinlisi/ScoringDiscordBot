create table scoring_count(
    id SERIAL PRIMARY KEY,
    discord_id TEXT NOT NULL,
    discord_server_id TEXT NOT NULL,
    count NUMERIC DEFAULT 0
)