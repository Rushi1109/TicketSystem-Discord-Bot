"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicket = void 0;
var discord_js_1 = require("discord.js");
var ticketPanel_1 = require("../models/ticketPanel");
function createTicket(message) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var filter, collectedData, collectedTitle, collectedDescription, collectedChannelID, channel, collectedCategoryID, category, panelMessage;
        var _this = this;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    filter = function (m) { return m.author.id === message.author.id; };
                    collectedData = {};
                    // Prompt the user for the title
                    message.channel.send('Please enter the title of the ticket:');
                    return [4 /*yield*/, message.channel.awaitMessages({
                            filter: filter,
                            max: 1,
                            time: 60000,
                            errors: ['time'],
                        })];
                case 1:
                    collectedTitle = _g.sent();
                    collectedData.title = (_a = collectedTitle.first()) === null || _a === void 0 ? void 0 : _a.content;
                    // Prompt the user for the description
                    message.channel.send('Please enter the description of the ticket:');
                    return [4 /*yield*/, message.channel.awaitMessages({
                            filter: filter,
                            max: 1,
                            time: 60000,
                            errors: ['time'],
                        })];
                case 2:
                    collectedDescription = _g.sent();
                    collectedData.description = (_b = collectedDescription.first()) === null || _b === void 0 ? void 0 : _b.content;
                    // Prompt the user for the channel ID
                    message.channel.send('Please enter the channel ID where the ticket should be created:');
                    return [4 /*yield*/, message.channel.awaitMessages({
                            filter: filter,
                            max: 1,
                            time: 60000,
                            errors: ['time'],
                        })];
                case 3:
                    collectedChannelID = _g.sent();
                    collectedData.channelID = (_c = collectedChannelID.first()) === null || _c === void 0 ? void 0 : _c.content;
                    channel = (_d = message.guild) === null || _d === void 0 ? void 0 : _d.channels.cache.get(String(collectedData.channelID));
                    if (!(channel instanceof discord_js_1.TextChannel)) {
                        message.channel.send('Invalid channel ID! Please provide a valid text channel ID.');
                        return [2 /*return*/];
                    }
                    // Prompt the user for the category ID
                    message.channel.send('Please enter the category ID where the ticket should be created:');
                    return [4 /*yield*/, message.channel.awaitMessages({
                            filter: filter,
                            max: 1,
                            time: 60000,
                            errors: ['time'],
                        })];
                case 4:
                    collectedCategoryID = _g.sent();
                    collectedData.categoryID = (_e = collectedCategoryID.first()) === null || _e === void 0 ? void 0 : _e.content;
                    category = (_f = message.guild) === null || _f === void 0 ? void 0 : _f.channels.cache.get(String(collectedData.categoryID));
                    if (!category || category.type !== discord_js_1.ChannelType.GuildCategory) {
                        message.channel.send('Invalid category ID! Please provide a valid category ID.');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, channel.send({
                            embeds: [{
                                    title: 'Ticket Panel',
                                    description: "**".concat(collectedData.title, "**\n").concat(collectedData.description),
                                    color: discord_js_1.Colors.Blurple,
                                }],
                            components: [{
                                    type: 1,
                                    components: [
                                        new discord_js_1.ButtonBuilder()
                                            .setCustomId('ticketOpen')
                                            .setLabel('create-ticket')
                                            .setStyle(discord_js_1.ButtonStyle.Success)
                                    ],
                                }],
                        })
                            .then(function (msg) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, ticketPanel_1.default.create({
                                            messageId: msg.id,
                                            categoryId: category.id,
                                        })
                                            .then(function (record) {
                                            console.log("Data inserted to mongoDB");
                                        })
                                            .catch(function (e) { return console.log(e); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (error) {
                            console.error('Error creating ticket panel:', error);
                        })];
                case 5:
                    panelMessage = _g.sent();
                    // Send a confirmation message
                    message.channel.send('Ticket Panel created!');
                    return [2 /*return*/];
            }
        });
    });
}
exports.createTicket = createTicket;
