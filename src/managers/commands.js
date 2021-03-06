const path = require('path');
const readdir = require('fs-readdir-recursive');
const chalk = require('chalk');

const Manager = require('./manager');

const tools = require('../factory')

class CommandManager extends Manager {
    getName() {
        return 'commands';
    }

    preInit() {
        this._commands = [];
        this.loadCommands();
    }

    init() {
        const bot = this.bot;
        this._commands.filter(command => command && command.init)
            .forEach(command => command.init(bot));
    }

    loadCommands() {
        const commandsFolder = path.resolve(__dirname, '..', 'commands');
        //console.log(commandsFolder)
        readdir(commandsFolder)
            .filter(file => !path.basename(file).startsWith('_') && file.endsWith('.js'))
            .forEach(file => {
                let command;

                try {
                    command = require(path.resolve(commandsFolder, file));
                } catch (error) {
                    return console.error(`Failed to load command file '${file}': ${error}`);
                }

                // Handle multi-command exports
                [].concat(command).forEach(single => this._loadSingle(single, file));
            });
    }

    validateCommand(command) {
        if (typeof command !== 'object') return 'Exports are empty';
        if (typeof command.run !== 'function') return 'Missing run function';
        if (typeof command.info !== 'object') return 'Missing info object';
        if (typeof command.info.name !== 'string') return 'Info object missing "name"';
        if (typeof command.info.description !== 'string') return 'Info object missing "description"';
        return '';
    }

    _loadSingle(command, file) {
        const check = this.validateCommand(command);

        if (check) {
            return console.error(`Error in '${file}': ${chalk.red(check)}`);
        }

        if (this.findCommand(command.info.name)) {
            return console.error(`Duplicate command: An entry already exists for command ${chalk.red(command.info.name)} in file '${file}'`);
        }

        this._commands.push(command);
    }

    findCommand(input) {
        const lower = input.toLowerCase();

        return this._commands.find(command => {
            return command.info.name.toLowerCase() === input.toLowerCase() ||
                (command.info.aliases && command.info.aliases.find(alias => alias === lower));
        });
    }

    canUse(member, command) {
        return !this._checkPermissions(member, command);
    }

    get commands() {
        // Essentially return a clone
        return this._commands.slice(0);
    }

    getContent(message) {
        const { content } = message;
        const { prefix } = global.config;
        // get custom config for prefix per server
        let customPrefix = this.bot.servers.get(message.guild.id)
        var finalPrefix = prefix
        if(customPrefix.prefix.length > 0 && customPrefix !== prefix) finalPrefix = customPrefix.prefix
        
        let out = '';

        if (content.startsWith(finalPrefix)) {
            out = content.substr(finalPrefix.length);

        } else if (content.startsWith(this.bot.user.toString())) {
            out = content.substr(this.bot.user.toString().length);
        }

        return out.trim();
    }

    async onMessage(message) {
        const content = this.getContent(message);
        if (!content) {
            return;
        }

        //const args = content.split(' ');//old
        const args = content.split(' ').filter(Boolean); //  remove empty string i.e ''

        const label = args.shift();

        const command = this.findCommand(label);
        if (!command) {
            return;
        }

        this.executeCommand(command, message, args);
    }

    async executeCommand(command, message, args) {
        
        const permMessage = this._checkPermissions(message.member, command);
        if (permMessage) {
            return message.channel.send(`:no_entry_sign: ${permMessage}`)
                .then(m => m.delete(5000));
        }

        try {
            //console.log(tools)
            await command.run(this.bot, message, args, tools);
        } catch (err) {
            const displayMessage = `${err && err.message || err || 'An unknown error has occurred!'}`;

            if (displayMessage == 'help') {
                return this.showHelp(command.info.name, message);
            }

            if (command.info.minArgs && args.length < command.info.minArgs) {
                return this.showHelp(command.info.name, message);
            }

            message.channel.send(tools.embed().setDescription(`:x: ${displayMessage}`))
                .then(m => m.delete(5000));
        }
    }

    _checkPermissions(member, command) {
        // command dissable, so do nothing
        if (command.info.disabled)
            return 'Sorry! \ncommand is dissabled by bot owner.';

        //guildOnly
        if (command.info.guildOnly && !message.guild)
            return `Sorry! \nThat command can only be used in guilds.`;

        if (command.info.perms) {
            const perms = [].concat(command.info.perms);

            for (const perm of perms) {
                if (!member.hasPermission(perm)) {
                    return `You need the permission \`${perm}\` to use this command.`;
                }
            }
        }

        if (command.info.ownerOnly && member.id !== (global.config.ownerID || '518167396691869696' || '563587297858027521')) {
            return 'Only the owner of the bot can use this command.';
        }

        return '';
    }

    showHelp(command, message) {
        this.executeCommand(this.findCommand('help'), message, [command]);
    }
}

module.exports = CommandManager;
