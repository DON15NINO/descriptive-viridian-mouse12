const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const ytdl = require("ytdl-core");
const { Client, Util } = require('discord.js');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyCx7drgLYZ-GSMUToLXBo4oWBAC6cUP7AA");
const queue = new Map();
const UserBlocked = new Set();
const prefix = '^'
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Whit FanBot.",{type:'WATCHING'});
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot with GMZN Host')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});



client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;


  let command = message.content.split(" ")[0];
  //command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);


if (message.content.startsWith(prefix + "say")) {
 if (message.author.id !== '516576049778130954') return message.reply('** فقط لصاحب البوت :no_entry:  **')
          message.delete()
    message.channel.sendMessage(args.join(" ")).catch(console.error);
  }


});

client.on("message", message => {
      if (message.content === "^ping") {
      const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField('**Ping:**' , `${Date.now() - message.createdTimestamp}` + ' ms')
  message.channel.sendEmbed(embed);
    }
});

client.on('message', message => {
    if (message.content.startsWith("^bot")) {
    message.channel.send({
        embed: new Discord.RichEmbed()
            .setAuthor(client.user.username,client.user.avatarURL)
            .setThumbnail(client.user.avatarURL)
            .setColor('RANDOM')
            .setTitle('``INFO FlameBot`` ')
            .addField('``My Ping``' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
            .addField('``RAM Usage``', `[${(process.memoryUsage().rss / 1048576).toFixed()}MB]`, true)
            .addField('``servers``', [client.guilds.size], true)
            .addField('``channels``' , `[ ${client.channels.size} ]` , true)
            .addField('``Users``' ,`[ ${client.users.size} ]` , true)
            .addField('``My Name``' , `[ ${client.user.tag} ]` , true)
            .addField('``My ID``' , `[ ${client.user.id} ]` , true)
			      .addField('``My Prefix``' , `[ ^ ]` , true)
			      .addField('``My Language``' , `[ Java Script ]` , true)
			      .setFooter('By | Wéèx .#3019')
    })
}
});

client.on('message', message=>{
  
  let args = message.content.substring(prefix.length).split(" ");

  switch(args[0]){
  case 'kick':
    
    
    var user = message.mentions.users.first();
    
    if(user){
      const member = message.guild.member(user);
      
      if(member){
        member.kick('**You are kick because**').then(() =>{
          message.channel.send(`:rocket: **Kicked** ${user.tag}`);
        }).catch(err =>{
          message.channel.send("**i was unable to kick this member Because** `he is a moderator`");
          console.log(err);
        });
      } else{
        message.channel.send("**i cant find this user!**")
      }
    } else{
      message.channel.send('**You need to mention a member**')
    }

}
})

  client.on("message",message => {
if(message.author.bot) return;
if(!message.content.startsWith(prefix)) return;
  if(message.content.startsWith(prefix + "avatar")){
const mention = message.mentions.users.first()

if(!mention) return console.log("") 
let embed = new Discord.RichEmbed()
.setColor("BLACK")
.setAuthor(`${mention.username}#${mention.discriminator}`,`${mention.avatarURL}`) 
.setTitle("Avatar Link")
.setURL(`${mention.avatarURL}`)
.setImage(`${mention.avatarURL}`)
.setFooter(`Requested By ${message.author.tag}`,`${message.author.avatarURL}`)    
    message.channel.send(embed)
}
})

client.on("message", message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  if(message.content.startsWith(prefix + "avatar server")) {
    let doma = new Discord.RichEmbed()
    .setColor("BLACK")
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setTitle("Avatar Link")
    .setURL(message.guild.iconURL)
    .setImage(message.guild.iconURL)
    .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL)
    message.channel.send(doma)
  } else if(message.content.startsWith(prefix + "avatar")) {
    let args = message.content.split(" ")[1]
var avt = args || message.author.id;    
    client.fetchUser(avt).then(user => {
     avt = user;
  let embed = new Discord.RichEmbed() 
  .setColor("BLACK")
  .setAuthor(`${avt.tag}`, avt.avatarURL)
  .setTitle("Avatar Link")
  .setURL(avt.avatarURL)
  .setImage(avt.avatarURL)
  .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL)
  message.channel.send(embed) 
    })
  }
})
  

 
client.on('message', message => {  
    if (message.author.bot) return; 
    if (message.content.startsWith(prefix + 'clear')) { 
    if(!message.channel.guild) return message.reply(`** This Command For Servers Only**`); 
     if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`** You don't have Premissions!**`);
     if(!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`**I don't have Permission!**`);
    let args = message.content.split(" ").slice(1)
    let messagecount = parseInt(args);
    if (args > 100) return message.reply(`** The number can't be more than **100** .**`).then(messages => messages.delete(5000))
    if(!messagecount) args = '100';
    message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages)).then(msgs => {
    message.channel.send(`** Done , Deleted ${msgs.size} messages.**`).then(messages => messages.delete(5000));
    })
  }
});

client.on('message', message=>{
  
  let args = message.content.substring(prefix.length).split(" ");

  switch(args[0]){
  case 'ban':
    
    
    const user = message.mentions.users.first();
    
    if(user){
      const member = message.guild.member(user);
      
      if(member){
        member.ban({ression: 'You Are Bad!!'}).then(() =>{
          message.channel.send(':rocket: **Banned**' `${user.tag}`);
        })
      } else{
        message.channel.send("That user isn't in this server").then(message => message.delete(5000));;
      }
    } else{
      message.channel.send('**You need to mention a member**').then(message => message.delete(5000));;
    }

}
})


client.on('message', msg => {
  if (msg.content === '^help') {      
    msg.react("✅")
  }
});

client.on("message", message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  if(message.content.startsWith(prefix + "help")) {
    let embed = new Discord.RichEmbed()
    .setAuthor(client.user.tag,client.user.avatarURL)
    .setColor("BLACK")
    .setDescription(` **If you want more info about any command**
Use: **^help [command name]** <a:4a26aa20e8a54406b3b8a72b3d10132d:723652220255469660>

**• Commands** ~~60~~

> **General** <a:e0dacdd4a8b946fa9652b34cc70a12ad:723650602286055525>
<a:677203465646243844:723715553461534798> ** ^submit ~ ل تقديم للادارةه**
<a:677203465646243844:723715553461534798> ** ^quran ~ ل عرض لك قرائن كريم **
<a:677203465646243844:723715553461534798> ** ^time ~ لعرض لك توقيت مصر والامارت **
<a:677203465646243844:723715553461534798> ** ^avatar server ~ لعرض لك صورة السيرفر **
<a:677203465646243844:723715553461534798> ** ^avatar ~ ل عرض صورتك **
<a:677203465646243844:723715553461534798> ** ^bans ~ لمعرفت عدد الاشخاص المتبندين **
<a:677203465646243844:723715553461534798> ** ^bot ~ يعرض لك معلومات عن البوت **
<a:677203465646243844:723715553461534798> ** ^top inv ~ يعرض لك كثر شخص بالدعوات **
 > **Moderatoin** <a:e0dacdd4a8b946fa9652b34cc70a12ad:723650602286055525>
<a:677203465646243844:723715553461534798> ** ^setVoice ~ ل تفعيل خاصية الفويس اون لاين**
<a:677203465646243844:723715553461534798> ** ^uchat ~ ل فك تقفيل الشات**
<a:677203465646243844:723715553461534798> ** ^cchat ~ ل تقفيل الشات**
<a:677203465646243844:723715553461534798> ** ^umute ~ ل فك الميوت الكتابي**
<a:677203465646243844:723715553461534798> ** ^mute ~ ل عمل ميوت كتابي لحد**
<a:677203465646243844:723715553461534798> ** ^ban ~ ل تبنيد احد من السيرفر**
<a:677203465646243844:723715553461534798> ** ^kick ~ ل طرد احد من السيرفر**
<a:677203465646243844:723715553461534798> ** ^role ~ ل اظهار جميع اوامر الرولات **
<a:677203465646243844:723715553461534798> ** ^clear ~ ل مسح الرسائل بالعدد  **
<a:677203465646243844:723715553461534798> ** ^warn ~ ل اعطاء تحذير لاحد **
<a:677203465646243844:723715553461534798> ** ^send ~ ل عمل تصويت ب روم محدد** `)
    message.author.send(embed)
  }
})

client.on("message", message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  if(message.content.startsWith(prefix + "help")) {
    let embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`> **Personal** <a:e0dacdd4a8b946fa9652b34cc70a12ad:723650602286055525> 
<a:677203465646243844:723715553461534798> ** ^profile ~ عرض بطاقة التعريف الشخصية العامة  **
<a:677203465646243844:723715553461534798> ** ^credit ~  ل معرفة كم معك من كردت **
<a:677203465646243844:723715553461534798> ** ^daily ~  ل لحصول على كردت **
<a:677203465646243844:723715553461534798> ** ^user ~  ل معرفة كل شئ عن حسابك **
> **Server** <a:e0dacdd4a8b946fa9652b34cc70a12ad:723650602286055525>
<a:677203465646243844:723715553461534798> ** ^roles ~ ل انشاء رولات جاهزة **
<a:677203465646243844:723715553461534798> ** ^ct ~ ل انشاء روم كتابي **
<a:677203465646243844:723715553461534798> ** ^hchannel ~ ل اخفاء جميع رومات السيرفر **
<a:677203465646243844:723715553461534798> ** ^schannel ~ ل اظهار جميع رومات السيرفر **
<a:677203465646243844:723715553461534798> ** ^dac ~ ل حذف جميع رومات السيرفر  **
<a:677203465646243844:723715553461534798> ** ^dar ~ ل حذف جميع رتب السيرفر  **
> ~~**Other**~~ <a:e0dacdd4a8b946fa9652b34cc70a12ad:723650602286055525>
<a:70a4fc56c74e4fd5846bae3e1d68eb7c:723741061075435541> ** ^inv ~ لارسال رابط دعوه البوت **
<a:70a4fc56c74e4fd5846bae3e1d68eb7c:723741061075435541> ** ^suppport ~ لارسال رابط سيرفر خادم بوت **
<a:70a4fc56c74e4fd5846bae3e1d68eb7c:723741061075435541> ** ^call ~ ارسال رسالة او اقتراح لصحاب بوت **

> ** Soon ** <a:97757ad39dec48f799e8b440a8e1fd67:723741527247159297> `)
    message.author.send(embed)
  }
})

client.on('message', msg => {
  if (msg.content === '^help') {      
    msg.channel.send("If DM **Locked** I didn it send the commands <:654107963551645709:723737586941558794>")
  }
});

client.on('message', msg => {
  if (msg.content === 'السلام عليكم') {
    msg.reply('وعليكم السلام ورحمة الله تعالى وبركاته <a:97757ad39dec48f799e8b440a8e1fd67:723741527247159297>');
  }
});


client.on('message', msg => {
  if (msg.content === 'باك') {
    msg.reply('Welcome Back  <a:97757ad39dec48f799e8b440a8e1fd67:723741527247159297> ');
  }
});


client.on('message', msg => {
  if (msg.content === 'هلا') {
    msg.reply('**هلا بيك يا عمري منور** <a:97757ad39dec48f799e8b440a8e1fd67:723741527247159297>');
  }
});

client.on('message', msg => {
  if (msg.content === 'باي') {
    msg.reply(' **باي يا حب** <a:97757ad39dec48f799e8b440a8e1fd67:723741527247159297>');
  }
});

client.on('message', message => {
 
    if (message.content === "^cchat") {
                        if(!message.channel.guild) return message.reply(' هذا الامر فقط للسيرفرات !!');
 
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false
 
           }).then(() => {
               message.reply("تم تقفيل الشات ✅ ")
           });
             }
if (message.content === "^uchat") {
    if(!message.channel.guild) return message.reply(' هذا الامر فقط للسيرفرات !!');
 
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true
 
           }).then(() => {
               message.reply("تم فتح الشات ✅")
           });
             }
 
 
 
});

client.on('message', msg => {
    if (msg.content.startsWith(`^warn`)) {
       let args = msg.content.split(" ").slice(1);
      if (!msg.mentions.members.first()) return msg.reply('منشن الشخص المحدد')
      if (!args[1]) return msg.reply('``اكتب السبب``')
      //غير اسم الروم او سوي روم بذا الاسم
      if (msg.guild.channels.find('name', 'warn')) {
        //اذا غيرت فوق غير هنا كمان
        msg.guild.channels.find('name', 'warns').send(`
      تم اعطائك تنبيه : ${msg.mentions.members.first()}
      لأنك قمت بما يلي
      ${args.join(" ").split(msg.mentions.members.first()).slice(' ')}
      `)
      }
    }
})

client.on('message', msg => {
  if (msg.content === 'السعودية') {      
    msg.react("SA")
    msg.channel.send("SA")
  }
});

client.on('message', msg => {
  if (msg.content === 'مصر') {      
    msg.react("🇪🇬")
    msg.channel.send("🇪🇬")
  }
});

client.on('message', msg => {
  if (msg.content === 'المغرب') {      
    msg.react("🇲🇦")
    msg.channel.send("🇲🇦")
  }
});

client.on('message', msg => {
  if (msg.content === 'العراق') {      
    msg.react("🇮🇶")
    msg.channel.send("🇮🇶")
  }
});

client.on('message', msg => {
  if (msg.content === 'الجزائر') {      
    msg.react("🇩🇿")
    msg.channel.send("🇩🇿")
  }
});

client.on('message', msg => {
  if (msg.content === 'الامارات') {      
    msg.react("🇦🇪")
    msg.channel.send("🇦🇪")
  }
});

client.on('message', msg => {
  if (msg.content === 'تونس') {      
    msg.react("🇹🇳")
    msg.channel.send("🇹🇳")
  }
});

client.on('message', msg => {
  if (msg.content === 'سوريا') {      
    msg.react("🇸🇾")
    msg.channel.send("🇸🇾")
  }
});

client.on('message', msg => {
  if (msg.content === 'ليبيا') {      
    msg.react("🇱🇾")
    msg.channel.send("🇱🇾")
  }
});

client.on('message', msg => {
  if (msg.content === 'قطر') {      
    msg.react("🇶🇦")
    msg.channel.send("🇶🇦")
  }
});

client.on('message', msg => {
  if (msg.content === 'الصومال') {      
    msg.react("🇸🇴")
    msg.channel.send("🇸🇴")
  }
});

client.on('message', msg => {
  if (msg.content === 'عمان') {      
    msg.react("🇴🇲")
    msg.channel.send("🇴🇲")
  }
});

client.on('message', msg => {
  if (msg.content === 'موريتانيا') {      
    msg.react("🇲🇷")
    msg.channel.send("🇲🇷")
  }
});

client.on("message", (message) => {
    /// ALPHA CODES
   if (message.content.startsWith("^ticket")) {     /// ALPHA CODES
        const reason = message.content.split(" ").slice(1).join(" ");     /// ALPHA CODES
        if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);    /// ALPHA CODES
        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Team");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });    /// ALPHA CODES
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: **تم إنشاء تذكرتك ، #${c.name}.**`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`مرحباّ ${message.author.username}!`, `يرجى محاولة شرح سبب فتح هذه التذكرة بأكبر قدر ممكن من التفاصيل. سيكون فريق الدعم لدينا قريبا للمساعدة.`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    }
 
 
  if (message.content.startsWith("^close")) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
 
        message.channel.send(`هل أنت متأكد؟ بعد التأكيد ، لا يمكنك عكس هذا الإجراء!\n للتأكيد ، اكتب\`^confirm\`. سيؤدي ذلك إلى مهلة زمنية في غضون 10 ثوانٍ وإلغائها`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === '*confirm', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })    /// ALPHA CODES
                    .then((collected) => {
                        message.channel.delete();
                    })    /// ALPHA CODES
                    .catch(() => {
                        m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                            m2.delete();
                        }, 3000);
                    });
            });
    }
 
});

client.on('message', function(msg) {
    const prefix = '^'
    if(msg.content.startsWith (prefix  + 'server')) {
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(msg.guild.iconURL)
      .setTitle(`Showing Details Of  **${msg.guild.name}*`)
      .addField('🌐** نوع السيرفر**',`[** __${msg.guild.region}__ **]`,true)
      .addField('🏅** __الرتب__**',`[** __${msg.guild.roles.size}__ **]`,true)
      .addField('🔴**__ عدد الاعضاء__**',`[** __${msg.guild.memberCount}__ **]`,true)
      .addField('🔵**__ عدد الاعضاء الاونلاين__**',`[** __${msg.guild.members.filter(m=>m.presence.status == 'online').size}__ **]`,true)
      .addField('📝**__ الرومات الكتابية__**',`[** __${msg.guild.channels.filter(m => m.type === 'text').size}__** ]`,true)
      .addField('🎤**__ رومات الصوت__**',`[** __${msg.guild.channels.filter(m => m.type === 'voice').size}__ **]`,true)
      .addField('👑**__ الأونـر__**',`**${msg.guild.owner}**`,true)
      .addField('🆔**__ ايدي السيرفر__**',`**${msg.guild.id}**`,true)
      .addField('📅**__ تم عمل السيرفر في__**',msg.guild.createdAt.toLocaleString())
      msg.channel.send({embed:embed});
    }
  });

client.on('message', message => {
         if (message.content === prefix + "time") {
         if (!message.channel.guild) return message.reply('** This command only for servers **');  
         var currentTime = new Date(),
            hours = currentTime.getHours() + 4 ,
            hours2 = currentTime.getHours() + 3 ,
            hours3 = currentTime.getHours() + 2 ,
            hours4 = currentTime.getHours() + 3 ,
            minutes = currentTime.getMinutes(),
            seconds = currentTime.getSeconds(),
            Year = currentTime.getFullYear(),
            Month = currentTime.getMonth() + 1,
            Day = currentTime.getDate();
             var h = hours
  if(hours > 12) {
               hours -= 12;
            } else if(hours == 0) {
                hours = "12";
            }  
             if(hours2 > 12) {
               hours2 -= 12;
            } else if(hours2 == 0) {
                hours2 = "12";
            
            }  
                         if(hours3 > 12) {
               hours3 -= 12;
            } else if(hours3 == 0) {
                hours3 = "12";
            } 
            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            var suffix = 'صباحاَ';
            if (hours >= 12) {
                suffix = 'مساء';
                hours = hours - 12;
            }
            if (hours == 0) {
                hours = 12;
            }
 

                var Date15= new Discord.RichEmbed()
                .setThumbnail("https://i.imgur.com/ib3n4Hq.png") 
                .setTitle( "『التاريخ  والوقت』")
                .setColor('RANDOM')
                .setFooter(message.author.username, message.author.avatarURL)
                .addField('الامارات',
                "『"+ hours + ":" + minutes +":"+ seconds + "』")
                 .addField('مكه المكرمه',
                "『"+ hours2 + ":" + minutes +":"+ seconds  + "』") 
                .addField('مصر',
                "『"+ hours3 + ":" + minutes +":"+ seconds  + "』") 
                
                .addField('Date',
                "『"+ Day + "-" + Month + "-" + Year +  "』")

                 message.channel.sendEmbed(Date15);
        }
    });




client.on("message", (message) => {
if (message.content.startsWith("^ct")) {
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
        let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(' '), 'text');
message.channel.sendMessage('تـم إنـشاء روم كـتابـي')

}
});

client.on("message", (message) => {
if (message.content.startsWith("^cv")) {
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
        let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(' '), 'voice');
    message.channel.sendMessage('تـم إنـشاء روم صـوتي')
    
}
});

client.login(process.env.BOT_TOKEN);
