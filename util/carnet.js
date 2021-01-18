const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js')

Canvas.registerFont(__dirname + '/../assets/AncizarSans_Bold.ttf', { family: 'AncizarSans_Bold' });


async function generateCarnet(user) {


    const canvas = Canvas.createCanvas(363, 551);
    const ctx = canvas.getContext('2d');

    ctx.font = '30px AncizarSans_Bold';
    ctx.fillStyle = "#5c6164";
    const id = 'TIUN ' + user.id
    const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));

    // Choose randomly between two models
    if (Math.random() < 0.5) {
        const background = await Canvas.loadImage(__dirname + '/../assets/carnet-1.png');

        // Use template
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.fillText(`${user.username}`, 30, 430);

        ctx.font = '18px AncizarSans_Bold';
        ctx.fillStyle = "#9aa3a8";
        ctx.fillText(id, 25, 458);

        ctx.drawImage(avatar, 30, 230, 160, 160);
    } else {
        // Use the other template
        const background = await Canvas.loadImage(__dirname + '/../assets/carnet-2.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.font = '30px AncizarSans_Bold';
        ctx.fillStyle = "#5c6164";
        ctx.fillText(`${user.username}`, 30, 430);

        ctx.font = '18px AncizarSans_Bold';
        ctx.fillStyle = "#9aa3a8";
        ctx.fillText(id, 75, 458);

        ctx.drawImage(avatar, 173, 203, 175, 175);

    }

    return canvas.toBuffer();

}

module.exports = { generateCarnet };