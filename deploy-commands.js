const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const dotenv = require('dotenv');
dotenv.config();


const token = process.env.TOKEN
const guild = process.env.GUILD_ID
const clientid = process.env.CLIENT_ID

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON())
    console.log("Loaded command : ", file);
}

const rest = new REST({ version: '10' }).setToken(token);

(async() => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientid, guild), { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.log(error);
    }
})();