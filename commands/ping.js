import { SlashCommandBuilder } from '@discordjs/builders';

export const Ping = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Will consider responding'),
    execute: (interaction) => interaction.reply({ content: 'pong I guess' })
}