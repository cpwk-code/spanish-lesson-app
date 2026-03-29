var W1 = [
  { week:1, day:1, focus:'Yo quiero', example:'Yo quiero pizza porque me gusta.',
    phases:[
      { id:'warmup', label:'Warm-up', duration:'5 min', icon:'☀️', prompt:'Warm up! Tell me 3 things you see. Say: Yo veo un...', hint:'Try: Yo veo un libro. Yo veo una silla.', targetWords:['veo'] },
      { id:'core', label:'Core Talk', duration:'10 min', icon:'💬', prompt:'Today: Yo quiero means I want. Tell me 3 things you want and WHY using porque!', hint:'Yo quiero helado porque es dulce.', targetWords:['quiero','porque'] },
      { id:'reading', label:'Reading', duration:'5 min', icon:'📖', prompt:'Read out loud: Yo quiero un perro porque me gusta jugar. What does it mean?', hint:'perro = dog | jugar = to play', targetWords:['perro','jugar'] },
      { id:'listening', label:'Listening', duration:'5 min', icon:'👂', prompt:'Repeat back: Yo quiero ir al parque porque hace sol. Then tell me what it means!', hint:'parque = park | hace sol = it is sunny', targetWords:['parque','sol'] },
      { id:'game', label:'Game Time', duration:'3 min', icon:'🎮', prompt:'Finish the sentence with porque: Yo quiero comer pizza...', hint:'Porque me gusta el queso. Porque tengo hambre.', targetWords:['porque'] }
    ]
  },
  { week:1, day:2, focus:'Me gusta', example:'Me gusta el helado porque es dulce.',
    phases:[
      { id:'warmup', label:'Warm-up', duration:'5 min', icon:'☀️', prompt:'Review! Tell me 2 things you wanted using Yo quiero.', hint:'Yo quiero... porque...', targetWords:['quiero'] },
      { id:'core', label:'Core Talk', duration:'10 min', icon:'💬', prompt:'Me gusta means I like. Tell me 3 things you like and why!', hint:'Me gusta el chocolate porque es rico.', targetWords:['gusta','porque'] },
      { id:'reading', label:'Reading', duration:'5 min', icon:'📖', prompt:'Read: Me gusta el parque porque puedo jugar con mis amigos. What does it mean?', hint:'puedo = I can | mis amigos = my friends', targetWords:['puedo','amigos'] },
      { id:'listening', label:'Listening', duration:'5 min', icon:'👂', prompt:'Repeat: No me gusta la lluvia porque hace frio. Translate it!', hint:'lluvia = rain | hace frio = it is cold', targetWords:['lluvia'] },
      { id:'game', label:'Game Time', duration:'3 min', icon:'🎮', prompt:'Tell me something you like AND something you do not like!', hint:'Me gusta... No me gusta...', targetWords:['gusta'] }
    ]
  },
  { week:1, day:3, focus:'Tengo', example:'Tengo un perro pequeno.',
    phases:[
      { id:'warmup', label:'Warm-up', duration:'5 min', icon:'☀️', prompt:'Review! Say one Yo quiero and one Me gusta sentence.', hint:'Yo quiero... / Me gusta...', targetWords:['quiero','gusta'] },
      { id:'core', label:'Core Talk', duration:'10 min', icon:'💬', prompt:'Tengo means I have. Tell me 3 things you have!', hint:'Tengo un gato. Tengo dos libros.', targetWords:['tengo'] },
      { id:'reading', label:'Reading', duration:'5 min', icon:'📖', prompt:'Read: Tengo un perro grande y una gata pequena. Me gusta jugar con ellos.', hint:'grande = big | pequena = small | ellos = them', targetWords:['grande'] },
      { id:'listening', label:'Listening', duration:'5 min', icon:'👂', prompt:'Repeat: Tengo hambre porque no desayune. Translate!', hint:'hambre = hunger | no desayune = I did not eat breakfast', targetWords:['hambre'] },
      { id:'game', label:'Game Time', duration:'3 min', icon:'🎮', prompt:'Say 3 things in the room using Tengo... en mi casa.', hint:'Tengo una mesa en mi casa.', targetWords:['tengo','casa'] }
    ]
  },
  { week:1, day:4, focus:'Voy a', example:'Voy a jugar despues.',
    phases:[
      { id:'warmup', label:'Warm-up', duration:'5 min', icon:'☀️', prompt:'Speed round! One sentence each: Yo quiero, Me gusta, Tengo. Go!', hint:'Yo quiero... / Me gusta... / Tengo...', targetWords:['quiero','gusta','tengo'] },
      { id:'core', label:'Core Talk', duration:'10 min', icon:'💬', prompt:'Voy a means I am going to. Tell me 3 things you are going to do today!', hint:'Voy a comer pizza. Voy a jugar afuera.', targetWords:['voy'] },
      { id:'reading', label:'Reading', duration:'5 min', icon:'📖', prompt:'Read: Voy a ir al parque con mi familia porque hace sol hoy.', hint:'familia = family | hoy = today', targetWords:['familia','hoy'] },
      { id:'listening', label:'Listening', duration:'5 min', icon:'👂', prompt:'Repeat: Voy a estudiar espanol porque quiero hablar bien. Translate!', hint:'estudiar = to study | hablar = to speak', targetWords:['estudiar','hablar'] },
      { id:'game', label:'Game Time', duration:'3 min', icon:'🎮', prompt:'Tell me the most exciting thing you are going to do this weekend using Voy a!', hint:'Voy a... porque...', targetWords:['voy'] }
    ]
  },
  { week:1, day:5, focus:'Combine all patterns', example:'Yo quiero helado porque me gusta. Tengo hambre y voy a comer.',
    phases:[
      { id:'warmup', label:'Warm-up', duration:'5 min', icon:'☀️', prompt:'Speed round! I say a word, you make a full sentence. First word: PERRO!', hint:'Use any phrase: Me gusta el perro. Tengo un perro.', targetWords:['porque'] },
      { id:'core', label:'Core Talk', duration:'10 min', icon:'💬', prompt:'COMBINE! Tell me about your perfect day using ALL FOUR phrases. Make it as long as you can!', hint:'Me gusta el sol. Voy a ir al parque. Yo quiero pizza.', targetWords:['quiero','gusta','tengo','voy'] },
      { id:'reading', label:'Reading', duration:'5 min', icon:'📖', prompt:'Read: Me llamo Rosa. Tengo ocho anos. Me gusta el chocolate. Voy a comer pizza hoy.', hint:'Me llamo = My name is | ocho anos = 8 years old', targetWords:['llamo'] },
      { id:'listening', label:'Listening', duration:'5 min', icon:'👂', prompt:'Retell in your own Spanish: Yo quiero un perro porque me gusta jugar. Voy a pedir un perro.', hint:'pedir = to ask for', targetWords:['pedir'] },
      { id:'game', label:'Game Time', duration:'3 min', icon:'🎮', prompt:'STORY CHAIN! Start with Yo quiero... and we build the story together!', hint:'Keep adding with all 4 phrases!', targetWords:['quiero','gusta','tengo','voy'] }
    ]
  },
  { week:1, day:6, focus:'Game Day - Role Play', example:'Yo quiero una hamburguesa, por favor.',
    phases:[
      { id:'warmup', label:'Warm-up', duration:'5 min', icon:'☀️', prompt:'Tell me everything you remember from this week!', hint:'Yo quiero, me gusta, tengo, voy a, porque...', targetWords:['quiero','gusta','tengo'] },
      { id:'core', label:'Role Play', duration:'10 min', icon:'🎭', prompt:'RESTAURANT GAME! You are the customer. Order using Yo quiero..., por favor.', hint:'por favor = please', targetWords:['quiero','favor'] },
      { id:'reading', label:'Reading', duration:'5 min', icon:'📖', prompt:'Read this menu: Pizza $8, Helado $4, Jugo de naranja $3. Now order 2 things!', hint:'Jugo de naranja = orange juice', targetWords:['quiero'] },
      { id:'listening', label:'Listening', duration:'5 min', icon:'👂', prompt:'The waiter says: Que quieres tomar? Repeat it back and answer!', hint:'Que quieres tomar = What do you want to drink?', targetWords:['quiero','tomar'] },
      { id:'game', label:'Game Time', duration:'3 min', icon:'🎮', prompt:'SILLY RESTAURANT! Order the most ridiculous meal in Spanish. Sillier the better!', hint:'Yo quiero pizza con helado porque...', targetWords:['quiero','porque'] }
    ]
  },
  { week:1, day:7, focus:'Story Day', example:'Un dia, Rosa queria ir al parque...',
    phases:[
      { id:'warmup', label:'Warm-up', duration:'5 min', icon:'☀️', prompt:'WEEK REVIEW! Tell me all 4 magic phrases with one example each.', hint:'Yo quiero... / Me gusta... / Tengo... / Voy a...', targetWords:['quiero','gusta','tengo','voy'] },
      { id:'core', label:'Core Talk', duration:'10 min', icon:'💬', prompt:'Create a story about Rosa using at least 3 phrases. Start: Rosa tiene ocho anos y...', hint:'tiene = has | Use quiero, gusta, tengo, voy a!', targetWords:['tiene','porque'] },
      { id:'reading', label:'Reading', duration:'5 min', icon:'📖', prompt:'Read: Rosa tiene ocho anos. Le gusta el chocolate. Ella tiene un perro que se llama Max.', hint:'ella = she | que se llama = named', targetWords:['ella','llama'] },
      { id:'listening', label:'Listening', duration:'5 min', icon:'👂', prompt:'Listen then retell: Max es un perro grande. Le gusta jugar. Hoy voy a jugar con Max.', hint:'hoy = today | jugar = to play', targetWords:['hoy','jugar'] },
      { id:'game', label:'Week Finale', duration:'3 min', icon:'🏆', prompt:'FINAL CHALLENGE! Tell YOUR story about today using as many Spanish phrases as you can!', hint:'Me llamo... Tengo... anos. Me gusta... Voy a... porque...', targetWords:['me llamo','tengo','gusta','voy'] }
    ]
  }
];

export var WEEK1 = W1;

export function getSystemPrompt(phase, day, attempts) {
  return "You are Maestra Sol, a warm encouraging Spanish tutor for an 8-year-old.\n"
    + "Phase: " + phase.label + " | Day: " + day.day + " | Focus: " + day.focus + "\n"
    + "RULES:\n"
    + "1. Keep ALL responses under 3 sentences.\n"
    + "2. Respond in plain English then model the target Spanish.\n"
    + "3. If answer uses target words (" + phase.targetWords.join(', ') + "), celebrate and push for expansion with porque.\n"
    + "4. If target words missing, model the full sentence and ask them to try again.\n"
    + "5. This is attempt " + attempts + ". If attempt >= 3 give the complete answer warmly and say Lets move on!\n"
    + "6. NEVER be discouraging. End every response with encouragement or a follow-up question.\n"
    + "7. Hint for this phase: " + phase.hint + "\n"
    + "Personality: warm, playful, patient. Like a fun teacher.";
}