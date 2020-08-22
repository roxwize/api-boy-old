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
client.login('no you will not use my bot token for malicious purposes');

// listen for messages and report them to the console

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'apitest') {
        console.log('*apitest requested...')
        const { fact } = await fetch('http://catfact.ninja/fact').then(response => response.json());
        const { text } = await fetch('https://uselessfacts.jsph.pl/random.json?language=en').then(response => response.json());
        const { facts } = await fetch('https://dog-api.kinduff.com/api/facts').then(response => response.json());
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
        const { link } = await fetch('https://some-random-api.ml/img/dog').then(response => response.json());

        const embed = new MessageEmbed()
            .setColor('#d1bf66')
            .setTitle('api testing')
            .addFields(
                { name: 'catfact.ninja', value: fact },
                { name: 'uselessfacts.jsph.pl', value: text},
                { name: 'dog-api.kinduff.com', value: facts},
                { name: 'aws.random.cat', value: file},
                { name: 'some-random-api.ml', value: link}
            );

            message.channel.send(embed);
            console.log('done!')
    } else if (command === 'cats') {
        console.log('*cats requested...')
        const { fact } = await fetch('http://catfact.ninja/fact').then(response => response.json());
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

        const catEmbed = new MessageEmbed()
            .setColor('#c446f2')
            .setTitle('cat fact')
            .setDescription(fact)
            .setImage(file)

        message.channel.send(catEmbed);
        console.log('done!');
    } else if (command === 'dogs') {
        console.log('*dogs requested...');
        const { facts } = await fetch('https://dog-api.kinduff.com/api/facts').then(response => response.json());
        const { link } = await fetch('https://some-random-api.ml/img/dog').then(response => response.json());

        const dogEmbed = new MessageEmbed()
        .setColor('#c446f2')
        .setTitle('dog fact')
        .setDescription(facts)
        .setImage(link)

        message.channel.send(dogEmbed);
        console.log('done!');
    }
});