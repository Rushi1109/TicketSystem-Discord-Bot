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
exports.handleButton = void 0;
var discord_js_1 = require("discord.js");
var ticketPanel_1 = require("../models/ticketPanel");
function handleButton(interaction, client) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var messageId, data, categoryID_1, channelName_1, chn;
        var _this = this;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!interaction.isButton()) return [3 /*break*/, 3];
                    if (!(interaction.customId == 'ticketOpen')) return [3 /*break*/, 3];
                    messageId = (_a = interaction.message) === null || _a === void 0 ? void 0 : _a.id;
                    return [4 /*yield*/, ticketPanel_1.default.findOne({ messageId: String(messageId) })];
                case 1:
                    data = _e.sent();
                    categoryID_1 = data === null || data === void 0 ? void 0 : data.categoryId;
                    channelName_1 = "ticket-".concat(interaction.user.id);
                    chn = (_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.channels.cache.find(function (ch) { var _a; return (ch.name == channelName_1 && ((_a = ch.parent) === null || _a === void 0 ? void 0 : _a.id) == categoryID_1); });
                    if ((chn === null || chn === void 0 ? void 0 : chn.name) == channelName_1) {
                        return [2 /*return*/, interaction.reply({
                                content: "You Already have one ticket running at <#".concat(chn.id, ">"),
                                ephemeral: true,
                            })];
                    }
                    return [4 /*yield*/, ((_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.channels.create({
                            name: "ticket-".concat(interaction.user.id),
                            parent: categoryID_1,
                            type: discord_js_1.ChannelType.GuildText,
                            topic: "ticket of ".concat(interaction.user.tag),
                            permissionOverwrites: [
                                {
                                    id: String(interaction.guildId),
                                    deny: [discord_js_1.PermissionFlagsBits.ViewChannel, discord_js_1.PermissionFlagsBits.SendMessages]
                                },
                                {
                                    id: String(interaction.user.id),
                                    allow: [discord_js_1.PermissionFlagsBits.ViewChannel, discord_js_1.PermissionFlagsBits.SendMessages, discord_js_1.PermissionFlagsBits.ReadMessageHistory]
                                },
                                {
                                    id: String((_d = client.user) === null || _d === void 0 ? void 0 : _d.id),
                                    allow: [discord_js_1.PermissionFlagsBits.Administrator, discord_js_1.PermissionFlagsBits.ManageChannels]
                                }
                            ]
                        }).then(function (ch) { return __awaiter(_this, void 0, void 0, function () {
                            var embed, row;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        embed = new discord_js_1.EmbedBuilder()
                                            .setTitle("Ticket of ".concat(interaction.user.username))
                                            .setDescription("Kindly wait for any admin to reply\nPlease do not spam or you'll get timed out.")
                                            .setColor(discord_js_1.Colors.Blurple);
                                        row = new discord_js_1.ActionRowBuilder()
                                            .addComponents(new discord_js_1.ButtonBuilder()
                                            .setCustomId('Accept')
                                            .setLabel("Accept")
                                            .setStyle(discord_js_1.ButtonStyle.Success), new discord_js_1.ButtonBuilder()
                                            .setCustomId('Reject')
                                            .setLabel("Reject")
                                            .setStyle(discord_js_1.ButtonStyle.Danger));
                                        return [4 /*yield*/, ch.send({ embeds: [embed], components: [row] })
                                                .catch(function (e) { return console.log(e); })];
                                    case 1:
                                        _a.sent();
                                        interaction.reply({
                                            content: "Your ticket is created <#".concat(ch.id, ">"),
                                            ephemeral: true,
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); }).catch(function (e) { return console.log(e); }))];
                case 2:
                    _e.sent();
                    _e.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.handleButton = handleButton;
