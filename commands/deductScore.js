import { SlashCommandBuilder } from '@discordjs/builders';

export const DeductScore = {
    data: new SlashCommandBuilder()
        .setName('deductscore')
        .setDescription('Deduct X score to specified user')
        .addUserOption(option =>
            option
                .setName('user')
                .setRequired(true)
                .setDescription('The user who\'s score to update')
        )
        .addIntegerOption(option => 
            option
                .setName('score')
                .setRequired(true)
                .setDescription('The amount to decrease the user\'s score by')
        ),
    execute: async (interaction) => {
        await interaction.deferReply();

        const user = interaction.options.getUser('user')
        const score = interaction.options.getInteger('score')
        let overallScore = score
        
        interaction.editReply({ content: `${score} points have been removed from ${user}\'s total giving him ${overallScore} overall` })
    }
}