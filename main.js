// require the discord.js module
const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
// for getting apis
const fetch = require('node-fetch');
const deepai = require('deepai');

// api key for deepai
deepai.setApiKey('f633d02f-8851-4d16-bf1a-79feaad36e3f');

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
        message.channel.send('current list of commands (prefix is *): \n \nhelp\napitest\nping\ninvite\ncats\ndogs\nai\nhoroscope');
    } else if (command === 'invite') {
        message.channel.send('http://discord.com/oauth2/authorize?client_id=746523325022470165&permissions=8&scope=bot');
    } else if (command === 'argtest') {
        if (!args.length) {
            return message.channel.send('no arguments provided');
        } else if (args[0] === 'stupid') {
            return message.channel.send('GRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
        }
        message.channel.send(`arguments: ${args}`);
    }
});

//remember to change the github main.js file too!
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
        var resp = await deepai.callStandardApi("text2img", {
            text: "discord bot",
        });

        const embed = new MessageEmbed()
            .setColor('#d1bf66')
            .setTitle('api testing')
            .addFields(
                { name: 'catfact.ninja', value: fact },
                { name: 'uselessfacts.jsph.pl', value: text },
                { name: 'dog-api.kinduff.com', value: facts },
                { name: 'aws.random.cat', value: file },
                { name: 'some-random-api.ml', value: link },
                { name: 'deepai.org', value: resp.output_url }
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
    } else if (command === 'ai') {
        console.log('*ai requested...');
        const input = args
        if (!args.length) {
            return message.channel.send("please provide text for the output");
        } else if (!args.length >= 2) {
            return message.channel.send("only one argument is allowed at the moment");
        } else {
            var resp = await deepai.callStandardApi("text2img", {
                text: `${input}`,
            });
            
            const aiEmbed = new MessageEmbed()
                .setColor('#c446f2')
                .setTitle('text2image')
                .setImage(resp.output_url)
                .setFooter('Provided by deepai.org')
    
            message.channel.send(aiEmbed);
            console.log('done!');
        }
        console.log(input);
    } else if (command === 'horoscope') {
        console.log('*horoscope requested...');
        const horoscopeURL = `https://aztro.sameerkumar.website?sign=${args}&day=today`;
        const hr = await fetch(horoscopeURL, {
            method: 'POST'
        })
        .then(response => response.json());
        console.log(args);
        if (!args.length) {
            return message.channel.send("please provide text for the output");
        } else if (args.length >= 2) {
            return message.channel.send("only one argument is allowed at the moment");
        } else if (hr.message) {
            return message.channel.send('please send a zodiac sign');
        } else {
            const horoscopeEmbed = new MessageEmbed()
                .setColor('#c446f2')
                .setTitle(`Horoscope for ${hr.current_date}`)
                .setDescription(`${hr.description} 
                Today's mood and color is ${hr.mood} and ${hr.color}, respectively. 
                You fare well with ${hr.compatibility}!`)
                .addFields(
                    { name: 'Luck-related things', value: `${hr.lucky_number} is your lucky number.
                    ${hr.lucky_time} is your lucky time. Keep an eye on the clock!`}
                )
            message.channel.send(horoscopeEmbed);
            console.log(hr);
        }
        console.log('done!');
    }
});