// require the discord.js module
const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
// for getting apis
const fetch = require('node-fetch');

// create a new Discord client
const client = new Discord.Client();
const prefix = '*';

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('locked n loaded >:)');
});

// login to Discord with your app's token
client.login('NzQ2NTIzMzI1MDIyNDcwMTY1.X0BkBg.EIoNgp4YD46kcw9jsVEYbK07hMc');

// listen for messages and report them to the console

client.on('message', message => {
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	// pong!!
    if (command === 'ping') {
	    message.channel.send('pong!!!!!!');
    } else if (command === 'help') {
        message.channel.send('current list of commands (prefix is *): \n \n help\napitest\nping\ninvite');
    } else if (command === 'invite') {
        message.channel.send('http://discord.com/oauth2/authorize?client_id=746523325022470165&permissions=8&scope=bot');
    } else {
        console.log(message.content);
    }
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'apitest') {
        const { fact } = await fetch('http://catfact.ninja/fact').then(response => response.json());
        const { text } = await fetch('https://uselessfacts.jsph.pl/random.json?language=en').then(response => response.json());

        const embed = new MessageEmbed()
            .setColor('#d1bf66')
            .setTitle('api testing')
            .addFields(
                { name: 'catfact.ninja', value: fact },
                { name: 'uselessfacts.jsph.pl', value: text}
            );

            message.channel.send(embed);
    }
});
