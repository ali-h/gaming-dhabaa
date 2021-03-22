require('dotenv').config();
const Discord = require('discord.js');
const schedule = require('node-schedule');

const client = new Discord.Client();

// set prefix
const prefix = '$';
let channel = null;
let insultUser = null;
let saranya = null;
let doBakwas = true;

const insults = [
  'Dr. Mr. Shahan The Unruly Eagle',
  'Hi wasted satisfaction',
  'You are a disappointment, bhool to nhi gya?',
  'Chutiya',
  'Chutiya',
  'You are a disappointment',
  'You are a disappointment',
  'You are a disappointment',
  'You are a disappointment',
  'You are a disappointment, bhool to nhi gya?',
  'Tujhy uss din beh jana chahiye tha',
  'A good asshole',
  'You are a disappointment, bhool to nhi gya?',
  'Dr. Mr. Shahan The Unruly Eagle',
  'The only women to tell you she loves you is your mom (doubtfully)',
  'HELLO MF',
  'Dr. Mr. Shahan The Unruly Eagle',
  'Anyone willing to fuck you is just too lazy to masturbate',
  'HELLO MF',
  'Seeing ya face tera left hand bhi tujh sy relationship me nhi rehna chahta',
  'A good asshole',
  'A good asshole',
  'HELLO MF',
  'You are a disappointment, bhool to nhi gya?',
  'You are a disappointment, bhool to nhi gya?',
  'You are a disappointment',
  'You are a disappointment',
  'You are a disappointment',
  'You are a disappointment',
  'HELLO MF',
  'Chutiya',
  'Chutiya',
  'You are a disappointment, bhool to nhi gya?',
];

const selectRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getUserFromMention = (mention) => {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

const insult = () => {
  if (doBakwas) {
    if (channel && insultUser) {
      channel.send(`${insultUser} ${selectRandom(insults)}`);
    } else if (channel) {
      channel.send('Kisi ki lene ke liye set karo');
    }
  }
};

// react on message
client.on('message', (message) => {
  if(!message.content.startsWith(prefix) || message.author.bot) return

  let args = message.content.slice(prefix.length).split(' ');
  let command = args.shift().toLowerCase();

  switch (command) {
    case 'greet-saranya':
      const saranyaGreetWords = [
        'Sawadee ka!',
        'Sawadee ka!',
        'waddaappp gamer girl!!',
        'Sawadee ka!',
        'Sawadee ka!',
        'Khuṇ pĕn xỳāngrị b̂āng',
        'Khuṇ pĕn xỳāngrị b̂āng',
        'Khuṇ pĕn xỳāngrị b̂āng',
        'Khuṇ pĕn xỳāngrị b̂āng',
        'Sawadee ka!',
        'Sawadee ka!',
        'Sawadee ka!',
        'waddaappp gamer girl!!',
        'Khuṇ pĕn xỳāngrị b̂āng',
        'waddaappp gamer girl!!',
        'waddaappp gamer girl!!',
        'Sawadee ka!',
        'waddaappp gamer girl!!',
        'hyo girl, how are you doing?',
        '***SARANYAAAAAAAA***',
        'hyo girl, how are you doing?',
        'Khuṇ pĕn xỳāngrị b̂āng',
        'Khuṇ pĕn xỳāngrị b̂āng',
        '***SARANYAAAAAAAA***',
        '***SARANYAAAAAAAA***',
        '***SARANYAAAAAAAA***',
        '***SARANYAAAAAAAA***',
        'Hi ;)',
        '***SARANYAAAAAAAA***',
        'Hi ;)',
        'Hi ;)',
        'hyo girl, how are you doing?',
        'How ya doing',
        'How ya doing',
        'O Hello!',
        'O Hello!',
      ];
  
      message.channel.send(`${saranya ? saranya : ''} ${selectRandom(saranyaGreetWords)}`);
      break;
    case 'set':
      if (message.author.discriminator === '7057') {
        const user = getUserFromMention(args[0]);
        if (!user) return message.channel.send('Give correct name');

        insultUser = user;
        message.channel.send('Ok done, now shut up');
        message.channel.send(`${user} see you`);
      } else {
        message.channel.send('Tera father kudh set kery ga');
      }
      break;
    case 'set-saranya':
      if (message.author.discriminator === '7057') {
        const user = getUserFromMention(args[0]);
        if (!user) return message.channel.send('Give correct name');

        saranya = user;
        message.channel.send('Ok done, now shut up');
        message.channel.send(`${user} ;)`);
      } else {
        message.channel.send('Tera father kudh set kery ga');
      }
      break;
    case 'stop':
      if (message.author.discriminator === '7057') {
        doBakwas = false;
      } else {
        message.channel.send('Tera father kudh set kery ga');
      }
      break;
    case 'start':
      if (message.author.discriminator === '7057') {
        doBakwas = true;
      } else {
        message.channel.send('Tera father kudh set kery ga');
      }
      break;
    default:
      message.channel.send('bsdk, not a correct command');
      break;
  }

});

client.once('ready', () => {
  console.log("BOT ONLINE");

  client.channels.cache.forEach(v => v.name === 'general' ? channel = v : null);
  channel.send('Hi guyyyys! its yo manager');
  insult();

  schedule.scheduleJob(`*/${process.env.INSULT_INTERVAL} * * * *`, insult);
});

client.login(process.env.BOT_TOKEN);
