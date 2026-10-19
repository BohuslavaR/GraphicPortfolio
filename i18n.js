/* ==================================================================
   I18N.JS — preklady stránky
   ------------------------------------------------------------------
   Anglický text je priamo v index.html pri prvkoch s atribútom
   data-i18n="kľúč". Tento súbor obsahuje slovenský a nemecký
   preklad každého kľúča a niekoľko anglických textov, ktoré
   v HTML nie sú (hlášky formulára, text na stieracej ploche).
   Ak preklad chýba, zobrazí sa anglický text.
   ================================================================== */
window.I18N_DICT = {

  /* --------------------------------------------------------------
     EN — texty, ktoré nie sú priamo v HTML
     -------------------------------------------------------------- */
  en: {
    'scratch.canvas': 'scratch to reveal',
    'car.goto': 'Go to banner',
    'form.sending': 'Sending…',
    'form.success': '✓ Message sent — thank you! I will get back to you soon.',
    'form.error': 'Something went wrong. Please email me directly at b.rozsypalova@gmail.com.'
  },

  /* --------------------------------------------------------------
     SK — slovenčina
     -------------------------------------------------------------- */
  sk: {
    /* Meta */
    'meta.title': 'Bohuslava Rozsypalová — Portfólio grafického dizajnu',
    'meta.desc': 'Grafické portfólio Bohuslavy Rozsypalovej — hravé nápady, farby a precízne remeslo vo vizuálnej identite, obaloch, tlači a ilustrácii.',

    /* Hlavička a ovládanie */
    'nav.work': 'Moja práca',
    'nav.process': 'Proces',
    'nav.gallery': 'Galéria',
    'nav.webs': 'Weby',
    'nav.contact': 'Kontakt',
    'nav.open': 'Otvoriť menu',
    'wheel.aria': 'Roztočte koleso pre nový farebný vzhľad',
    'wheel.hint': 'roztočte pre nový vzhľad',
    'a11y.top': 'Späť hore',
    'a11y.scroll': 'Posunúť na ďalšiu sekciu',
    'a11y.scrollLabel': 'ďalej',

    /* Bočné menu */
    'side.home': 'Úvod',
    'side.showcase': 'Výber prác',
    'side.journey': 'Dizajny produktov',
    'side.materials': 'Materiály',
    'side.cup': 'Dizajn hrnčeka',
    'side.motto': 'Stieracia plocha',
    'side.process': 'Proces',
    'side.moodboard': 'Moodboard',
    'side.gallery': 'Galéria',
    'side.displays': 'Každý displej',
    'side.print': 'Tlač',
    'side.landing': 'Landing pages',
    'side.webs': 'Weby',
    'side.specimen': 'Písmo a farby',
    'side.contact': 'Kontakt',

    /* Hero */
    'hero.title': 'DOBRÝ DEŇ,<br>SOM BOHUSLAVA.',
    'hero.tagline': 'Toto je grafická časť môjho portfólia — <strong>hravé nápady, výrazné farby a precízne remeslo</strong> naprieč značkami, produktmi aj tlačou.',
    'hero.alt': 'Portrét Bohuslavy Rozsypalovej',

    /* Carousel */
    'car.label': 'Vybrané práce',
    'car.more': 'Zobraziť viac',
    'car.prev': 'Predchádzajúci banner',
    'car.next': 'Ďalší banner',
    'car.goto': 'Prejsť na banner',
    'car.alt1': 'Web Grandhotel na notebooku, tablete a mobile',
    'car.alt2': 'Papiernická sada CassCo',
    'car.alt3': 'Landing page seminára UCB',
    'car.alt4': 'Ukážka jedného z mojich webov',

    /* Dizajny produktov */
    'journey.title': 'Moje dizajny<br>produktov',
    'journey.text': 'Rada beriem jeden dizajnový nápad a prenášam ho na rôzne materiály — od plátených tašiek cez keramické hrnčeky až po nálepky a obaly. Každý projekt začína konceptom a podľa toho, kde napokon skončí, si nachádza vlastnú logiku vo farbe, mierke a textúre. Kúsok, ktorý tu vidíte — taška s motívom inšpirovaným renesanciou — je jedným príkladom tohto procesu: klasické umenie pretavené do niečoho nositeľného a každodenného.',
    'journey.alt': 'Produktový rad Maison',

    /* Materiály */
    'mg.eyebrow': 'bližší pohľad',
    'mg.title': 'Viac o materiáloch',
    'mg.hint': 'Niekoľko ďalších kúskov z tej istej série.',

    /* Dizajn hrnčeka */
    'cup.title': 'JEDEN NÁPAD,<br>NOVÝ POVRCH',
    'cup.text': 'Rovnaký prístup, tentoraz na hrnčeku — plochý dizajn prenesený na oblý povrch tak, aby nestratil rovnováhu ani čitateľnosť. Dostať vzor či ilustráciu na zakrivený, funkčný predmet je samostatná malá hádanka a ja ju riešim naozaj rada.',
    'cup.alt': 'Dizajn hrnčeka Sakura',

    /* Stieracia plocha */
    'motto.eyebrow': 'interaktívne',
    'motto.title': 'Zotrite obrazovku',
    'motto.hint': 'Kliknite a ťahajte (alebo potiahnite prstom) po paneli nižšie a odhaľte obrázok pod ním.',
    'motto.reset': 'Obnoviť',
    'scratch.canvas': 'zotrite a odhaľte',

    /* Proces */
    'process.title': 'V ZÁKULISÍ<br>PROCESU',
    'process.text': 'Každý kúsok vzniká dávno pred finálnym renderom — zo skíc, farebných testov a množstva pokusov a omylov. Toto je bližší pohľad na to, ako nápad naozaj vzniká: referencie, ktoré zbieram, návrhy, ktoré neprejdú, a drobné rozhodnutia, ktoré formujú výsledok. Je to menej uhladené než hotová práca, no práve tu sa odohráva skutočné premýšľanie.',
    'process.alt': 'Skicár s nápadmi',

    /* Moodboard */
    'mood.eyebrow': 'vyskúšajte si',
    'mood.title': 'Otestujte si farebné kombinácie',
    'mood.hint': 'Posúvajte farebné vzorky a zistite, ktoré kombinácie k sebe ladia.',
    'mood.reset': 'Obnoviť plochu',
    'color.peach': 'Broskyňová',
    'color.sage': 'Šalviová',
    'color.charcoal': 'Uhlová',
    'color.cream': 'Krémová',
    'color.terracotta': 'Terakota',
    'color.mauve': 'Slezová',
    'color.taupe': 'Sivohnedá',
    'color.dustyrose': 'Prašná ružová',
    'color.softsage': 'Jemná šalviová',
    'color.warmsand': 'Teplý piesok',
    'color.blushpink': 'Púdrová ružová',
    'color.mutedclay': 'Tlmená hlina',
    'color.sandstone': 'Pieskovec',
    'color.deepterracotta': 'Tmavá terakota',
    'color.honeysand': 'Medový piesok',
    'color.warmgrey': 'Teplá sivá',
    'color.fadedcoral': 'Vyblednutá koralová',
    'color.softolive': 'Jemná olivová',
    'color.espresso': 'Espresso',
    'color.ivory': 'Slonovinová',

    /* Galéria M-Victory */
    'gal.eyebrow': 'archív prác',
    'gal.title': 'Celá galéria: web M-Victory',
    'gal.hint': 'Vyberte si kategóriu a pozrite si 10 ďalších kúskov z tejto kolekcie.',
    'gal.women': 'Sekcia pre ženy',
    'gal.men': 'Sekcia pre mužov',
    'gal.back': '← Späť na kategórie',

    /* Dizajn pre každý displej */
    'displays.eyebrow': 'responzívny dizajn',
    'displays.title': 'Dizajn pre<br>každý displej',
    'displays.lead': 'Rozloženia, ktoré pôsobia prirodzene na mobile, tablete aj širokom monitore — a pritom nestratia svoj charakter.',
    'displays.text': 'Dobrý dizajn sa nerozpadne, keď sa zmení obrazovka. Každý layout plánujem od najmenšieho mobilu až po široký monitor, aby si typografia, obrázky aj tlačidlá vždy zachovali svoj rytmus a zostali ľahko použiteľné.',
    'displays.desktop': 'Desktop',
    'displays.tablet': 'Tablet',
    'displays.mobile': 'Mobil',

    /* Tlač */
    'print.eyebrow': 'na papieri',
    'print.title': 'Tlač / Print',
    'print.lead': 'Plagáty, letáky, obaly a tlačoviny — pripravené s ohľadom na papier, farby aj finálny orez.',

    /* Landing pages */
    'landing.eyebrow': 'zamerané na konverziu',
    'landing.title': 'Landing pages<br>s jasným cieľom',
    'landing.lead': 'Jedna stránka, jedna správa, jedna akcia. Navrhnuté tak, aby návštevníka doviedli priamo ku kliknutiu, na ktorom záleží.',
    'landing.text': 'Každá landing page, ktorú navrhujem, má jedinú úlohu. Jasný nadpis, príbeh, ktorý odpovedá na správne otázky, a jedna silná výzva k akcii — nič, čo by od cieľa odvádzalo pozornosť.',
    'landing.goal': 'Cieľ:',
    'landing.goal1': 'registrácie',
    'landing.goal2': 'predaj',
    'landing.goal3': 'rezervácie',

    /* Weby */
    'webs.eyebrow': 'ďalšie projekty',
    'webs.title': 'Moje ďalšie<br>weby',
    'webs.lead': 'Niekoľko ďalších webov, ktoré som navrhla a vytvorila — každý s vlastným vzhľadom, publikom a účelom.',
    'webs.visit': 'Navštíviť web',
    'webs.cv': 'Online životopis',
    'webs.photo': 'Fotografické portfólio',
    'webs.hotel': 'Koncept Grandhotel',

    /* Písmo a farby */
    'spec.eyebrow': 'za dizajnom',
    'spec.title': 'Systém písma a farieb',
    'spec.typeLabel': 'Písmo — Montserrat (náhradné: Roboto → Helvetica Neue → Arial)',
    'spec.body': 'Aa Bb Cc — Regular 400 / bežný text, použitý v odsekoch na celej stránke.',
    'spec.palette': 'Paleta — Gold',
    'color.gold': 'Zlatá',
    'color.sand': 'Piesková',
    'color.greige': 'Sivobéžová',
    'color.mocha': 'Mocha',
    'color.burgundy': 'Bordová',
    'color.ivoryGold': 'Slonovinová',
    'color.champagne': 'Šampanská',
    'color.bronze': 'Bronzová',

    /* Kontakt */
    'contact.title': 'NAPÍŠTE<br>MI',
    'contact.text': 'Máte projekt, ktorý potrebuje farbu, remeslo alebo dizajn na novom materiáli? Rada sa s Vami porozprávam.',
    'contact.emailLabel': 'E-mail:',
    'contact.phoneLabel': 'Telefón:',
    'contact.locationLabel': 'Lokalita:',
    'contact.place': 'Košice / Bratislava, Slovensko',
    'form.name': 'Meno',
    'form.email': 'E-mail',
    'form.message': 'Správa',
    'form.send': 'Odoslať',
    'form.sending': 'Odosiela sa…',
    'form.success': '✓ Správa bola odoslaná — ďakujem! Čoskoro sa Vám ozvem.',
    'form.error': 'Niečo sa pokazilo. Napíšte mi, prosím, priamo na b.rozsypalova@gmail.com.',
    'form.note': 'Vaše údaje nebudú nikomu poskytnuté. Nikdy neposielajte heslá.',

    /* Lightbox */
    'lb.close': 'Zavrieť',
    'lb.prev': 'Predchádzajúci obrázok',
    'lb.next': 'Ďalší obrázok'
  },

  /* --------------------------------------------------------------
     DE — nemčina
     -------------------------------------------------------------- */
  de: {
    /* Meta */
    'meta.title': 'Bohuslava Rozsypalová — Grafikdesign-Portfolio',
    'meta.desc': 'Grafikportfolio von Bohuslava Rozsypalová — verspielte Ideen, Farbe und Handwerk in Markenidentität, Verpackung, Print und Illustration.',

    /* Hlavička a ovládanie */
    'nav.work': 'Meine Arbeit',
    'nav.process': 'Prozess',
    'nav.gallery': 'Galerie',
    'nav.webs': 'Websites',
    'nav.contact': 'Kontakt',
    'nav.open': 'Menü öffnen',
    'wheel.aria': 'Drehen Sie das Rad für einen neuen Farblook',
    'wheel.hint': 'drehen für einen neuen Look',
    'a11y.top': 'Nach oben',
    'a11y.scroll': 'Zum nächsten Abschnitt',
    'a11y.scrollLabel': 'weiter',

    /* Bočné menu */
    'side.home': 'Start',
    'side.showcase': 'Auswahl',
    'side.journey': 'Produktdesigns',
    'side.materials': 'Materialien',
    'side.cup': 'Tassendesign',
    'side.motto': 'Rubbelfeld',
    'side.process': 'Prozess',
    'side.moodboard': 'Moodboard',
    'side.gallery': 'Galerie',
    'side.displays': 'Jedes Display',
    'side.print': 'Druck',
    'side.landing': 'Landingpages',
    'side.webs': 'Websites',
    'side.specimen': 'Schrift & Farbe',
    'side.contact': 'Kontakt',

    /* Hero */
    'hero.title': 'GUTEN TAG,<br>ICH BIN BOHUSLAVA.',
    'hero.tagline': 'Das ist die Grafikdesign-Seite meines Portfolios — <strong>verspielte Ideen, kräftige Farben und Handwerk</strong> für Marken, Produkte und Print.',
    'hero.alt': 'Porträt von Bohuslava Rozsypalová',

    /* Carousel */
    'car.label': 'Ausgewählte Arbeiten',
    'car.more': 'Mehr ansehen',
    'car.prev': 'Vorheriges Banner',
    'car.next': 'Nächstes Banner',
    'car.goto': 'Zu Banner',
    'car.alt1': 'Grandhotel-Website auf Laptop, Tablet und Smartphone',
    'car.alt2': 'Briefpapier-Set von CassCo',
    'car.alt3': 'Landingpage für ein UCB-Seminar',
    'car.alt4': 'Vorschau einer meiner Websites',

    /* Dizajny produktov */
    'journey.title': 'Meine<br>Produktdesigns',
    'journey.text': 'Ich liebe es, eine einzelne Designidee auf verschiedene Materialien zu übertragen — von Stofftaschen über Keramiktassen bis hin zu Stickern und Verpackungen. Jedes Projekt beginnt mit einem Konzept und findet dann, je nachdem wo es landet, seine eigene Logik in Farbe, Maßstab und Textur. Das hier gezeigte Stück — eine Tragetasche mit von der Renaissance inspiriertem Motiv — ist ein Beispiel dafür: klassische Bildwelten, verwandelt in etwas Tragbares und Alltägliches.',
    'journey.alt': 'Produktlinie Maison',

    /* Materiály */
    'mg.eyebrow': 'genauer hingeschaut',
    'mg.title': 'Mehr zu Materialien',
    'mg.hint': 'Ein paar weitere Stücke aus derselben Serie.',

    /* Dizajn hrnčeka */
    'cup.title': 'EINE IDEE,<br>NEUE OBERFLÄCHE',
    'cup.text': 'Derselbe Ansatz, diesmal auf einer Tasse — ein flaches Design wird auf eine gewölbte Oberfläche übertragen, ohne Balance oder Lesbarkeit zu verlieren. Ein Muster oder eine Illustration auf einem runden, funktionalen Objekt zum Funktionieren zu bringen, ist ein eigenes kleines Rätsel — und eines, das ich wirklich gerne löse.',
    'cup.alt': 'Tassendesign Sakura',

    /* Stieracia plocha */
    'motto.eyebrow': 'interaktiv',
    'motto.title': 'Wischen Sie den Bildschirm frei',
    'motto.hint': 'Klicken und ziehen Sie (oder wischen Sie) über das Feld unten, um das Bild darunter freizulegen.',
    'motto.reset': 'Zurücksetzen',
    'scratch.canvas': 'freirubbeln',

    /* Proces */
    'process.title': 'HINTER<br>DEM PROZESS',
    'process.text': 'Jedes Stück beginnt lange vor dem finalen Rendering — mit Skizzen, Farbtests und viel Ausprobieren. Hier ein genauerer Blick darauf, wie eine Idee wirklich entsteht: die Referenzen, die ich sammle, die Entwürfe, die es nicht schaffen, und die kleinen Entscheidungen, die das Ergebnis prägen. Es ist weniger poliert als die fertige Arbeit, aber genau hier passiert das eigentliche Denken.',
    'process.alt': 'Ideenbuch mit Skizzen',

    /* Moodboard */
    'mood.eyebrow': 'probieren Sie es aus',
    'mood.title': 'Testen Sie Ihre Farbkombinationen',
    'mood.hint': 'Verschieben Sie die Farbfelder und finden Sie heraus, welche Kombinationen zusammenpassen.',
    'mood.reset': 'Board zurücksetzen',
    'color.peach': 'Pfirsich',
    'color.sage': 'Salbei',
    'color.charcoal': 'Anthrazit',
    'color.cream': 'Creme',
    'color.terracotta': 'Terrakotta',
    'color.mauve': 'Mauve',
    'color.taupe': 'Taupe',
    'color.dustyrose': 'Altrosa',
    'color.softsage': 'Zartes Salbei',
    'color.warmsand': 'Warmer Sand',
    'color.blushpink': 'Puderrosa',
    'color.mutedclay': 'Gedämpfter Ton',
    'color.sandstone': 'Sandstein',
    'color.deepterracotta': 'Tiefe Terrakotta',
    'color.honeysand': 'Honigsand',
    'color.warmgrey': 'Warmgrau',
    'color.fadedcoral': 'Verblasste Koralle',
    'color.softolive': 'Zartes Oliv',
    'color.espresso': 'Espresso',
    'color.ivory': 'Elfenbein',

    /* Galéria M-Victory */
    'gal.eyebrow': 'aus dem Archiv',
    'gal.title': 'Die ganze Galerie: M-Victory Website',
    'gal.hint': 'Wählen Sie eine Kategorie, um 10 weitere Stücke aus dieser Kollektion zu sehen.',
    'gal.women': 'Damenbereich',
    'gal.men': 'Herrenbereich',
    'gal.back': '← Zurück zu den Kategorien',

    /* Dizajn pre každý displej */
    'displays.eyebrow': 'responsives Design',
    'displays.title': 'Design für<br>jedes Display',
    'displays.lead': 'Layouts, die auf Smartphone, Tablet und großem Bildschirm gleichermaßen zu Hause sind — ohne ihren Charakter zu verlieren.',
    'displays.text': 'Gutes Design zerbricht nicht, wenn sich der Bildschirm ändert. Ich plane jedes Layout vom kleinsten Smartphone bis zum breiten Monitor, damit Typografie, Bilder und Buttons immer ihren Rhythmus behalten und einfach zu bedienen bleiben.',
    'displays.desktop': 'Desktop',
    'displays.tablet': 'Tablet',
    'displays.mobile': 'Smartphone',

    /* Tlač */
    'print.eyebrow': 'auf Papier',
    'print.title': 'Druck / Print',
    'print.lead': 'Plakate, Flyer, Verpackungen und Drucksachen — sorgfältig vorbereitet für Papier, Farbe und den finalen Beschnitt.',

    /* Landing pages */
    'landing.eyebrow': 'conversion-orientiert',
    'landing.title': 'Landingpages<br>mit klarem Ziel',
    'landing.lead': 'Eine Seite, eine Botschaft, eine Aktion. Gestaltet, um Besucher direkt zum entscheidenden Klick zu führen.',
    'landing.text': 'Jede Landingpage, die ich gestalte, hat genau eine Aufgabe. Eine klare Headline, eine Geschichte, die die richtigen Fragen beantwortet, und ein starker Call-to-Action — nichts, was vom Ziel ablenkt.',
    'landing.goal': 'Ziel:',
    'landing.goal1': 'Anmeldungen',
    'landing.goal2': 'Verkäufe',
    'landing.goal3': 'Buchungen',

    /* Weby */
    'webs.eyebrow': 'weitere Projekte',
    'webs.title': 'Meine weiteren<br>Websites',
    'webs.lead': 'Weitere Websites, die ich gestaltet und umgesetzt habe — jede mit eigenem Look, eigener Zielgruppe und eigenem Zweck.',
    'webs.visit': 'Website besuchen',
    'webs.cv': 'Online-Lebenslauf',
    'webs.photo': 'Fotografie-Portfolio',
    'webs.hotel': 'Grandhotel-Konzept',

    /* Písmo a farby */
    'spec.eyebrow': 'hinter dem Design',
    'spec.title': 'Schrift- & Farbsystem',
    'spec.typeLabel': 'Schrift — Montserrat (Fallback: Roboto → Helvetica Neue → Arial)',
    'spec.body': 'Aa Bb Cc — Regular 400 / Fließtext, verwendet für Absätze auf der gesamten Website.',
    'spec.palette': 'Palette — Gold',
    'color.gold': 'Gold',
    'color.sand': 'Sand',
    'color.greige': 'Greige',
    'color.mocha': 'Mokka',
    'color.burgundy': 'Burgunder',
    'color.ivoryGold': 'Elfenbein',
    'color.champagne': 'Champagner',
    'color.bronze': 'Bronze',

    /* Kontakt */
    'contact.title': 'SCHREIBEN SIE<br>MIR',
    'contact.text': 'Sie haben ein Projekt, das Farbe, Handwerk oder ein Design auf einem neuen Material braucht? Ich freue mich auf ein Gespräch mit Ihnen.',
    'contact.emailLabel': 'E-Mail:',
    'contact.phoneLabel': 'Telefon:',
    'contact.locationLabel': 'Standort:',
    'contact.place': 'Košice / Bratislava, Slowakei',
    'form.name': 'Name',
    'form.email': 'E-Mail',
    'form.message': 'Nachricht',
    'form.send': 'Senden',
    'form.sending': 'Wird gesendet…',
    'form.success': '✓ Nachricht gesendet — vielen Dank! Ich melde mich bald bei Ihnen.',
    'form.error': 'Etwas ist schiefgelaufen. Bitte schreiben Sie mir direkt an b.rozsypalova@gmail.com.',
    'form.note': 'Ihre Daten werden nicht weitergegeben. Senden Sie niemals Passwörter.',

    /* Lightbox */
    'lb.close': 'Schließen',
    'lb.prev': 'Vorheriges Bild',
    'lb.next': 'Nächstes Bild'
  }
};
