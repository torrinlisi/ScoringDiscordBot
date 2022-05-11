import { SlashCommandBuilder } from '@discordjs/builders';

export const Bussy = {
    data: new SlashCommandBuilder()
        .setName('bussy')
        .setDescription('Please enter your target')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user who\'s bussy you want to pound')
                .setRequired(true)
        ),
    execute: async (interaction) => {
        return interaction.reply(`${interaction.user} pounds ${interaction.options.getUser('user')}'s bussy`)
    }
}