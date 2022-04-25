import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, Intents, Collection } from 'discord.js';
import { ping } from './commands/ping.js'
import dotenv from 'dotenv'

dotenv.config()
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
const TOKEN = process.env['TOKEN']
// for testing only
const TEST_GUILD_ID = process.env['TEST_GUILD_ID']

const commands = [ping]

// When the client is ready, this only runs once
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity(`Begrudgingly alive`);
    // Registering the commands in the client
    const CLIENT_ID = client.user.id;
    const rest = new REST({ version: '9' }).setToken(TOKEN);
    (async () => {
        try {
            if (!TEST_GUILD_ID) {
                await rest.put(
                    Routes.applicationCommands(CLIENT_ID), {
                        body: commands.map((command) => command.data.toJSON())
                    },
                );
                console.log('Successfully registered application commands globally');
            } else {
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, TEST_GUILD_ID), {
                        body: commands.map((command) => command.data.toJSON())
                    },
                );
                console.log('Successfully registered application commands for development guild');
            }
        } catch (error) {
            if (error) console.error(error);
        }
    })();
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = commands.filter((command) => command.data.name === interaction.commandName)[0];
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        if (error) console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(TOKEN)