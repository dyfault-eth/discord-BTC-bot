const { Client, GatewayIntentBits, Events } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const coingecko = require('coingecko-api');
const coingeckoclient = new coingecko();

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

const token = process.env.TOKEN;

bot.on(Events.InteractionCreate, async(interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "price") {
        try {
            const id = interaction.options.getString('id');
    
            let price = await coingeckoclient.coins.markets({
                ids: id,
                vs_currencies: 'usd'
            });

            console.log(price);
        
            let priceResult = price.data[0]["current_price"];
            let priceVar = Number(price.data[0]["price_change_percentage_24h"]).toFixed(2);
        
            await interaction.reply({content: `${id} : ${priceResult}$, ${priceVar}% last 24H`, ephemeral: true})
        } catch (error) {
            if (error) {
                await interaction.reply({content: "you broke Coingecko API, are you enjoy ? :GOGOLE:", ephemeral: true});
            }
        }
    }

    if (interaction.commandName === "btc") {
        try {
            let price = await coingeckoclient.coins.markets({
                ids: 'bitcoin',
                vs_currencies: 'usd'
            });

            console.log(price);
        
            let priceResult = price.data[0]["current_price"];
            let priceVar = Number(price.data[0]["price_change_percentage_24h"]).toFixed(2);
        
            await interaction.reply({content: `Bitcoin : ${priceResult}$, ${priceVar}% last 24H`, ephemeral: true})
        } catch (error) {
            if (error) {
                await interaction.reply({content: "you broke Coingecko API, are you enjoy ? :GOGOLE:", ephemeral: true});
            }
        }
    }
});

bot.on('ready', async() => {
    console.log("discord bot ready");
});

bot.login(token);