import { SlashCommandBuilder } from '@discordjs/builders';

import createUser from '../commonFuctions/createUser.cjs';
// import getUser from '../commonFuctions/getUser.cjs';
// import editUser from '../commonFuctions/getUser.cjs';

export const AddScore = {
    data: new SlashCommandBuilder()
        .setName('addscore')
        .setDescription('Adds X score to specified user')
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
                .setDescription('The amount to increase the user\'s score by')
        ),
    execute: async (interaction) => {
        await interaction.deferReply()

        const serverId = interaction.guildId
        const userToEdit = interaction.options.getUser('user')
        const initScore = interaction.options.getInteger('score')

        await createUser(serverId, userToEdit.id, initScore)

        // const initScore = interaction.options.getInteger('score')
        // let score = initScore
        // if (userToEdit) {
        //     score = await editUser(userToEdit, score)
        // } else {
        //     await createUser(userToEdit, score)
        // }

        interaction.editReply({ content: `${initScore} points have been added to ${userToEdit}\'s total giving him ${initScore} overall` })
    }
}