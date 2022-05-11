const { Pool } = require('pg')

const createUser = async function (serverId, userId, score) {
    const pool = new Pool()

    const res = await pool.query(`INSERT INTO scoring_count(discord_id, discord_server_id, score) VALUES ('${serverId}', '${userId}', ${score})`)
    await pool.end()

    console.log(res)
}

module.exports = createUser;