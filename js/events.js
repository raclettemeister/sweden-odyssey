// Sweden Odyssey — Random Events
// Dark humor Oregon Trail-style events

const Events = {
    // Scout commentary lines (meta-humor)
    scoutQuips: [
        "J'aurais pu être au Hellfest là...",
        "C'est normal que des gens meurent en camp scout ?",
        "Ma mère va me tuer... enfin si la montagne le fait pas avant",
        "On est censés faire du macramé, pas survivre à l'apocalypse",
        "Le chef a dit que c'était 'formateur'. Formateur de quoi ?",
        "Mes potes sont à Barcelone en ce moment...",
        "L'an prochain je fais les Éclaireurs de France",
        "C'est le dernier camp scout de ma vie",
        "On devrait écrire nos testaments ce soir",
        "Techniquement on peut appeler les secours hein ?",
        "Qui a dit que les limaces c'était pas comestible ?"
    ],
    
    trigger(state, callback) {
        // 60% chance of event during afternoon phase
        if (Math.random() > 0.6) {
            callback();
            return;
        }
        
        // Select random event based on location type
        const eventPool = this.getEventPool(state.locationType);
        const event = eventPool[Math.floor(Math.random() * eventPool.length)];
        
        state.currentEvent = event;
        event.execute(callback);
    },
    
    getEventPool(locationType) {
        const generic = [
            this.eventMooseOnTrail,
            this.eventStorm,
            this.eventBerries,
            this.eventTwistedAnkle,
            this.eventAuroraBorealis,
            this.eventHomesickness,
            this.eventGearFailure,
            this.eventFika
        ];
        
        const wilderness = [
            this.eventBearTracks,
            this.eventLostInForest,
            ...generic
        ];
        
        const mountain = [
            this.eventSnowCrossing,
            this.eventReindeerStampede,
            this.eventViewpoint,
            ...generic
        ];
        
        const lake = [
            this.eventRiverCrossing,
            this.eventRaftBuild,
            this.eventFisherman,
            ...generic
        ];
        
        if (locationType === 'wilderness') return wilderness;
        if (locationType === 'mountain') return mountain;
        if (locationType === 'lake') return lake;
        
        return generic;
    },
    
    // EVENT: Moose on trail
    eventMooseOnTrail: {
        execute(callback) {
            UI.showText(
                `ÉLAN SUR LE SENTIER\n\nUn élan massif bloque le chemin. Il ne bouge pas. Il vous regarde.\n\nPaka : "C'est... très gros."`,
                [
                    { text: 'Attendre qu\'il parte (temps perdu)', action: () => Events.mooseWait(callback) },
                    { text: 'Contourner (perte d\'énergie)', action: () => Events.mooseDetour(callback) },
                    { text: 'Faire du bruit pour l\'effrayer', action: () => Events.mooseScare(callback) }
                ]
            );
        }
    },
    
    mooseWait(callback) {
        Game.modifyResource('energy', -5);
        Game.addJournalEntry('Un élan a bloqué le sentier. Attente de 2 heures.');
        UI.showText(
            `Le groupe attend. Et attend. L'élan mange tranquillement.\n\nAprès 2 heures, il part. -5 énergie.`,
            [{ text: 'Continuer', action: callback }]
        );
    },
    
    mooseDetour(callback) {
        Game.modifyResource('energy', -10);
        Game.addJournalEntry('Détour pour éviter l\'élan.');
        UI.showText(
            `Le groupe fait un large détour. -10 énergie.\n\nOurson : "Pourquoi on fait pas juste demi-tour ?"`,
            [{ text: 'Continuer', action: callback }]
        );
    },
    
    mooseScare(callback) {
        if (Math.random() < 0.7) {
            Game.addJournalEntry('L\'élan a fui. Succès.');
            UI.showText(
                `Le groupe crie, agite les bras. L'élan regarde, réfléchit, puis s'en va lentement.\n\nKana : "On est des guerriers !"`,
                [{ text: 'Continuer', action: callback }]
            );
        } else {
            const victim = Game.killScout('L\'élan n\'a pas apprécié le bruit.');
            if (victim) {
                Game.modifyResource('morale', -20);
                UI.showText(
                    `Le groupe crie. L'élan charge.\n\n${victim} était au mauvais endroit.\n\nLa nature est indifférente.`,
                    [{ text: 'Continuer', action: () => Events.showQuip(callback) }]
                );
            } else {
                callback();
            }
        }
    },
    
    // EVENT: Storm
    eventStorm: {
        execute(callback) {
            UI.showText(
                `LA TEMPÊTE FRAPPE\n\nLe ciel s'assombrit. Le vent hurle. La pluie s'abat comme un rideau d'acier.\n\nSurikat : "On s'abrite ou on continue ?"`,
                [
                    { text: 'S\'abriter (temps perdu, safe)', action: () => Events.stormShelter(callback) },
                    { text: 'Continuer sous la pluie (risqué)', action: () => Events.stormContinue(callback) }
                ]
            );
        }
    },
    
    stormShelter(callback) {
        Game.modifyResource('energy', -5);
        Game.addJournalEntry('Abri sous la tempête. Sage décision.');
        UI.showText(
            `Le groupe trouve un abri sous les arbres. Mouillés, mais sains et saufs.\n\nKana chante une chanson. +5 moral.`,
            [{ text: 'Continuer', action: () => { Game.modifyResource('morale', 5); callback(); } }]
        );
    },
    
    stormContinue(callback) {
        if (Math.random() < 0.5) {
            Game.modifyResource('energy', -15);
            Game.modifyResource('morale', -10);
            Game.addJournalEntry('Marche sous la tempête. Épuisant.');
            UI.showText(
                `Le groupe avance sous la pluie battante. Chaque pas est une épreuve.\n\n-15 énergie, -10 moral.\n\nOurson : "Je déteste tout."`,
                [{ text: 'Continuer', action: callback }]
            );
        } else {
            const victim = Game.killScout('La montagne était glissante.');
            if (victim) {
                Game.modifyResource('morale', -15);
                UI.showText(
                    `${victim} glisse sur une pierre mouillée.\n\nLa chute est longue.\n\nLa montagne était indifférente.`,
                    [{ text: 'Continuer', action: () => Events.showQuip(callback) }]
                );
            } else {
                callback();
            }
        }
    },
    
    // EVENT: Wild berries
    eventBerries: {
        execute(callback) {
            UI.showText(
                `MYRTILLES SAUVAGES !\n\nChiakri trouve des baies. Beaucoup de baies. Elles sont bleues, appétissantes.\n\nChiakri : "On peut les manger, non ?"`,
                [
                    { text: 'Manger les baies (risqué)', action: () => Events.berriesEat(callback) },
                    { text: 'Ignorer les baies (safe)', action: () => Events.berriesIgnore(callback) }
                ]
            );
        }
    },
    
    berriesEat(callback) {
        if (Math.random() < 0.6) {
            Game.modifyResource('food', 15);
            Game.modifyResource('morale', 8);
            Game.addJournalEntry('Festin de myrtilles sauvages.');
            UI.showText(
                `Ce sont bien des myrtilles ! Le groupe se régale. +15 nourriture, +8 moral.\n\nChiakri : "J'ai un talent !"`,
                [{ text: 'Continuer', action: callback }]
            );
        } else {
            const victim = Game.killScout('Ce n\'étaient pas des myrtilles.');
            if (victim) {
                Game.modifyResource('morale', -18);
                UI.showText(
                    `${victim} mange en premier. Quelque chose n'allait pas.\n\n${victim} faisait confiance aux baies. Les baies ne l'ont pas épargné.\n\nChiakri pleure.`,
                    [{ text: 'Continuer', action: () => Events.showQuip(callback) }]
                );
            } else {
                callback();
            }
        }
    },
    
    berriesIgnore(callback) {
        Game.modifyResource('morale', -3);
        UI.showText(
            `"On ne prend pas de risques," dit Paka. Le groupe passe son chemin.\n\nChiakri boude. -3 moral.`,
            [{ text: 'Continuer', action: callback }]
        );
    },
    
    // EVENT: Twisted ankle
    eventTwistedAnkle: {
        execute(callback) {
            UI.showText(
                `CHEVILLE TORDUE\n\nMustak glisse sur une racine. Il crie. Sa cheville est enflée.\n\nMustak : "Je peux continuer..."\n\nPeut-il ?`,
                [
                    { text: 'Le porter (coûte beaucoup d\'énergie)', action: () => Events.ankleCarry(callback) },
                    { text: 'Le laisser à la prochaine ville', action: () => Events.ankleLeave(callback) },
                    { text: 'Utiliser trousse premiers soins', action: () => Events.ankleHeal(callback) }
                ]
            );
        }
    },
    
    ankleCarry(callback) {
        Game.modifyResource('energy', -20);
        Game.modifyResource('morale', 10);
        Game.addJournalEntry('Mustak porté par le groupe. Épuisant mais solidaire.');
        UI.showText(
            `Shikra et Oslo portent Mustak à tour de rôle. -20 énergie, +10 moral.\n\nMustak : "Merci... je vous revaudrai ça."`,
            [{ text: 'Continuer', action: callback }]
        );
    },
    
    ankleLeave(callback) {
        Game.state.scouts--;
        Game.state.party.find(s => s.name === 'Mustak').alive = false;
        Game.modifyResource('morale', -12);
        Game.addJournalEntry('Mustak laissé en arrière. Il rejoindra à la fin.');
        UI.showText(
            `Le groupe le laisse dans un village. Il prendra un bus.\n\nJaguar : "C'est logique."\n\nLe reste du groupe est silencieux. -1 scout (temporaire), -12 moral.`,
            [{ text: 'Continuer', action: callback }]
        );
    },
    
    ankleHeal(callback) {
        if (Game.hasItem('Trousse premiers soins')) {
            Game.damageItem('Trousse premiers soins');
            Game.modifyResource('health', 5);
            Game.addJournalEntry('Cheville soignée avec la trousse.');
            UI.showText(
                `Bandage, anti-douleurs. Mustak peut marcher.\n\n"Merci," dit-il. +5 santé groupe.`,
                [{ text: 'Continuer', action: callback }]
            );
        } else {
            UI.showText(
                `Pas de trousse de premiers soins disponible.`,
                [{ text: 'Autre choix', action: () => Events.eventTwistedAnkle.execute(callback) }]
            );
        }
    },
    
    // EVENT: Aurora Borealis
    eventAuroraBorealis: {
        execute(callback) {
            Game.modifyResource('morale', 15);
            Game.addJournalEntry('Aurores boréales dans le ciel nocturne. Magnifique.');
            UI.showText(
                `AURORES BORÉALES\n\nLe ciel s'embrase. Vert, violet, dansant.\n\nLe groupe s'arrête, bouche bée. Personne ne parle.\n\nUn moment de beauté pure dans le carnage.\n\n+15 moral.`,
                [{ text: 'Continuer', action: callback }]
            );
        }
    },
    
    // EVENT: Bear tracks
    eventBearTracks: {
        execute(callback) {
            UI.showText(
                `TRACES D'OURS\n\nArgali s'arrête. Traces fraîches dans la boue. Très grosses. Très fraîches.\n\nArgali : "...on change de route ?"`,
                [
                    { text: 'Détour (safe mais lent)', action: () => Events.bearDetour(callback) },
                    { text: 'Continuer prudemment', action: () => Events.bearContinue(callback) }
                ]
            );
        }
    },
    
    bearDetour(callback) {
        Game.modifyResource('energy', -12);
        Game.addJournalEntry('Détour pour éviter l\'ours. Sage décision.');
        UI.showText(
            `Le groupe fait un large détour. Pas d'ours rencontré.\n\n-12 énergie.\n\nPaka : "On est vivants. C'est ce qui compte."`,
            [{ text: 'Continuer', action: callback }]
        );
    },
    
    bearContinue(callback) {
        if (Math.random() < 0.4) {
            const victim = Game.killScout('L\'ours n\'était pas une métaphore.');
            const victim2 = Math.random() < 0.3 ? Game.killScout('L\'ours avait faim.') : null;
            
            if (victim) {
                Game.modifyResource('morale', -25);
                let text = `L'ours était là.\n\n${victim} n'a pas eu le temps de courir.`;
                if (victim2) text += `\n\n${victim2} non plus.`;
                text += '\n\nL\'ours n\'était pas une métaphore.';
                
                UI.showText(text, [{ text: 'Fuir', action: () => Events.showQuip(callback) }]);
            } else {
                callback();
            }
        } else {
            Game.addJournalEntry('Traces d\'ours aperçues, mais pas d\'ours.');
            UI.showText(
                `Le groupe avance en silence. Les traces sont là, mais pas d'ours.\n\nOslo : "Peut-être qu'il est végétarien ?"`,
                [{ text: 'Continuer', action: callback }]
            );
        }
    },
    
    // EVENT: River crossing
    eventRiverCrossing: {
        execute(callback) {
            UI.showText(
                `LA RIVIÈRE EST DÉCHAÎNÉE\n\nCourant violent. Rochers glissants. L'eau monte jusqu'aux genoux.\n\nSurikat : "On traverse ou on cherche un pont ?"`,
                [
                    { text: 'Traverser à gué (rapide, risqué)', action: () => Events.riverFord(callback) },
                    { text: 'Chercher un pont (lent, safe)', action: () => Events.riverBridge(callback) }
                ]
            );
        }
    },
    
    riverFord(callback) {
        if (Math.random() < 0.5) {
            Game.modifyResource('energy', -8);
            Game.addJournalEntry('Traversée de rivière réussie.');
            UI.showText(
                `Le groupe traverse prudemment. Eau glacée. Tout le monde arrive de l'autre côté.\n\n-8 énergie.\n\nChiakri tombe une fois. On le rattrape.`,
                [{ text: 'Continuer', action: callback }]
            );
        } else {
            const victim = Game.killScout('Le fleuve prend. Le fleuve ne rend pas.');
            if (victim) {
                Game.modifyResource('morale', -22);
                UI.showText(
                    `${victim} perd pied. Le courant est trop fort.\n\nOn crie son nom. Il disparaît.\n\nLe fleuve prend. Le fleuve ne rend pas.`,
                    [{ text: 'Continuer', action: () => Events.showQuip(callback) }]
                );
            } else {
                callback();
            }
        }
    },
    
    riverBridge(callback) {
        Game.modifyResource('energy', -15);
        Game.addJournalEntry('Détour pour trouver un pont. Sécuritaire.');
        UI.showText(
            `Le groupe marche 2 heures en amont. Un vieux pont en bois.\n\nTraversée sans incident. -15 énergie.`,
            [{ text: 'Continuer', action: callback }]
        );
    },
    
    // EVENT: Reindeer stampede
    eventReindeerStampede: {
        execute(callback) {
            if (Math.random() < 0.7) {
                Game.modifyResource('morale', 8);
                Game.addJournalEntry('Troupeau de rennes aperçu. Majestueux.');
                UI.showText(
                    `TROUPEAU DE RENNES\n\nUn troupeau traverse au loin. Paisible, majestueux.\n\nLe groupe s'arrête pour regarder. +8 moral.\n\nKana : "La Suède est belle."`,
                    [{ text: 'Continuer', action: callback }]
                );
            } else {
                const victim = Game.killScout('Les rennes ont paniqué.');
                if (victim) {
                    Game.modifyResource('morale', -18);
                    UI.showText(
                        `STAMPEDE DE RENNES\n\nQuelque chose effraie le troupeau. Ils chargent.\n\n${victim} était au mauvais endroit.\n\nLes rennes ne s'arrêtent pas.`,
                        [{ text: 'Continuer', action: () => Events.showQuip(callback) }]
                    );
                } else {
                    callback();
                }
            }
        }
    },
    
    // EVENT: Epic viewpoint
    eventViewpoint: {
        execute(callback) {
            Game.modifyResource('morale', 12);
            Game.addJournalEntry('Point de vue incroyable. Moment mémorable.');
            UI.showText(
                `POINT DE VUE INCROYABLE\n\nLe sommet s'ouvre sur une vallée infinie. Lacs, forêts, montagnes à perte de vue.\n\nLe groupe reste silencieux. C'est... magnifique.\n\n+12 moral.\n\nRodéo : "Pour ça que je marche."`,
                [
                    { text: 'Admirer prudemment', action: callback },
                    { text: 'S\'approcher du bord (risqué)', action: () => Events.viewpointEdge(callback) }
                ]
            );
        }
    },
    
    viewpointEdge(callback) {
        if (Math.random() < 0.8) {
            UI.showText(
                `Le groupe s'approche. La vue est encore meilleure.\n\nChiakri commence à glisser. Shikra le rattrape.\n\n"Trop près," murmure Paka.`,
                [{ text: 'Continuer', action: callback }]
            );
        } else {
            const victim = Game.killScout('Trop près du bord.');
            if (victim) {
                Game.modifyResource('morale', -20);
                UI.showText(
                    `${victim} s'approche trop. La pierre cède.\n\nLa chute est silencieuse.\n\nLa vue était magnifique. Le prix était trop haut.`,
                    [{ text: 'Reculer', action: () => Events.showQuip(callback) }]
                );
            } else {
                callback();
            }
        }
    },
    
    // EVENT: Gear failure
    eventGearFailure: {
        execute(callback) {
            const items = Game.state.inventory.filter(i => i.condition !== 'Cassé');
            if (items.length === 0) {
                callback();
                return;
            }
            
            const item = items[Math.floor(Math.random() * items.length)];
            Game.damageItem(item.name);
            Game.addJournalEntry(`${item.name} endommagé.`);
            
            UI.showText(
                `CATASTROPHE MATÉRIEL\n\n${item.name} : ${item.condition}.\n\nCe n'est pas mortel. Juste misérable.`,
                [{ text: 'Continuer', action: callback }]
            );
        }
    },
    
    // EVENT: Homesickness
    eventHomesickness: {
        execute(callback) {
            UI.showText(
                `LE MAL DU PAYS\n\nUn des scouts pleure en silence. Il veut rentrer.\n\nPaka : "On le réconforte ou... ?"`,
                [
                    { text: 'Réconforter (+moral)', action: () => Events.homesickComfort(callback) },
                    { text: 'Ignorer (rien)', action: () => Events.homesickIgnore(callback) }
                ]
            );
        }
    },
    
    homesickComfort(callback) {
        Game.modifyResource('morale', 8);
        Game.addJournalEntry('Scout réconforté. Le groupe se serre les coudes.');
        UI.showText(
            `Kana s'assoit à côté. Parle doucement. Le scout arrête de pleurer.\n\n+8 moral.\n\n"On est ensemble," dit Kana. "On finit ensemble."`,
            [{ text: 'Continuer', action: callback }]
        );
    },
    
    homesickIgnore(callback) {
        if (Math.random() < 0.3) {
            Game.state.scouts--;
            Game.modifyResource('morale', -15);
            Game.addJournalEntry('Un scout a quitté le groupe pendant la nuit.');
            UI.showText(
                `Le lendemain matin, il n'est plus là. Parti pendant la nuit.\n\nOn ne l'a jamais revu. -1 scout, -15 moral.\n\nJaguar : "Il a eu raison de partir."`,
                [{ text: 'Continuer', action: () => Events.showQuip(callback) }]
            );
        } else {
            callback();
        }
    },
    
    // EVENT: Lost in forest
    eventLostInForest: {
        execute(callback) {
            UI.showText(
                `PERDUS\n\nOslo tenait la carte. La carte était à l'envers.\n\nLe groupe est perdu. Très perdu.\n\nArgali : "Donne-moi cette carte."`,
                [
                    { text: 'Chercher le chemin (coûte temps)', action: () => Events.lostSearch(callback) },
                    { text: 'Continuer au hasard (risqué)', action: () => Events.lostRandom(callback) }
                ]
            );
        }
    },
    
    lostSearch(callback) {
        Game.modifyResource('energy', -18);
        Game.addJournalEntry('Le groupe s\'est perdu. Retrouvé après 3 heures.');
        UI.showText(
            `Argali étudie la carte, le soleil, les arbres. 3 heures plus tard : "Par là."\n\n-18 énergie.\n\nOslo : "Désolé..."`,
            [{ text: 'Continuer', action: callback }]
        );
    },
    
    lostRandom(callback) {
        if (Math.random() < 0.6) {
            Game.modifyResource('energy', -25);
            Game.modifyResource('morale', -10);
            UI.showText(
                `Le groupe marche au hasard. Heures perdues. Arbres identiques. Panique qui monte.\n\nFinalement, un sentier. -25 énergie, -10 moral.`,
                [{ text: 'Continuer', action: callback }]
            );
        } else {
            const count = Math.random() < 0.5 ? 1 : 2;
            const victims = [];
            for (let i = 0; i < count; i++) {
                const v = Game.killScout('La forêt gagne toujours.');
                if (v) victims.push(v);
            }
            
            if (victims.length > 0) {
                Game.modifyResource('morale', -20);
                UI.showText(
                    `Le groupe se sépare. Erreur fatale.\n\n${victims.join(' et ')} ne reviennent pas.\n\nLa forêt est patiente. La forêt gagne toujours.`,
                    [{ text: 'Continuer', action: () => Events.showQuip(callback) }]
                );
            } else {
                callback();
            }
        }
    },
    
    // EVENT: Fisherman (positive)
    eventFisherman: {
        execute(callback) {
            Game.modifyResource('food', 15);
            Game.modifyResource('morale', 8);
            Game.addJournalEntry('Pêcheur local rencontré. Nourriture partagée.');
            UI.showText(
                `PÊCHEUR LOCAL\n\nUn vieil homme au bord du lac. Il partage son poisson fumé.\n\n"La montagne est dangereuse," dit-il. "Faites attention."\n\n+15 nourriture, +8 moral, +100 angoisse.`,
                [{ text: 'Remercier et continuer', action: callback }]
            );
        }
    },
    
    // EVENT: Fika (always positive)
    eventFika: {
        execute(callback) {
            Game.modifyResource('morale', 12);
            Game.modifyResource('energy', 8);
            Game.addJournalEntry('Pause fika suédoise. Sacré.');
            UI.showText(
                `FIKA\n\nLe groupe trouve le spot parfait. Vue magnifique. Café chaud. Kanelbullar.\n\nMoment de paix totale.\n\n+12 moral, +8 énergie.\n\nLe fika est sacré.`,
                [{ text: 'Savourer', action: callback }]
            );
        }
    },
    
    // EVENT: Raft building (special set piece)
    eventRaftBuild: {
        execute(callback) {
            UI.showText(
                `CONSTRUCTION DU RADEAU\n\nPaka sort son tomahawk. "On construit un radeau."\n\nLe groupe : "...sérieux ?"\n\nPaka : "SÉRIEUX."`,
                [
                    { text: 'Construire le radeau (minijeu)', action: () => Events.raftMinigame(callback) },
                    { text: 'Contourner le lac (long)', action: () => { Game.modifyResource('energy', -20); callback(); } }
                ]
            );
        }
    },
    
    raftMinigame(callback) {
        // Simple raft building minigame
        Game.state.inMinigame = true;
        const container = document.getElementById('minigame-container');
        container.classList.remove('hidden');
        
        container.innerHTML = `
            <div class="minigame-title">CONSTRUCTION DU RADEAU</div>
            <div class="minigame-instructions" style="max-width: 500px;">
                Le groupe coupe des rondins, les attache avec de la corde.<br><br>
                Paka dirige les opérations. Chiakri tombe dans le lac trois fois.<br><br>
                Après 4 heures : le radeau est prêt.
            </div>
            <button class="minigame-close" id="raft-done">Lancer le radeau</button>
        `;
        
        document.getElementById('raft-done').addEventListener('click', () => {
            Game.state.inMinigame = false;
            container.classList.add('hidden');
            Game.addJournalEntry('Radeau construit. Traversée du lac.');
            Game.modifyResource('morale', 15);
            
            UI.showText(
                `Le radeau flotte ! Le groupe monte dessus prudemment.\n\nTraversée paisible. Kana lit un livre sur le radeau.\n\n+15 moral.\n\nPaka : "Je vous avais dit."`,
                [{ text: 'Continuer', action: callback }]
            );
        });
    },
    
    // EVENT: Snow crossing (mountain-specific)
    eventSnowCrossing: {
        execute(callback) {
            UI.showText(
                `TRAVERSÉE DE NEIGE\n\nEn plein été. Il y a de la neige. Beaucoup de neige.\n\nMustak : "C'est... normal ?"`,
                [
                    { text: 'Traverser prudemment', action: () => Events.snowCross(callback) },
                    { text: 'Contourner', action: () => { Game.modifyResource('energy', -15); callback(); } }
                ]
            );
        }
    },
    
    snowCross(callback) {
        if (Math.random() < 0.7) {
            Game.modifyResource('energy', -12);
            Game.addJournalEntry('Traversée de neige réussie.');
            UI.showText(
                `Le groupe traverse lentement. Neige jusqu'aux genoux.\n\nTout le monde passe. -12 énergie.\n\nOurson : "J'ai les pieds mouillés. Je déteste tout."`,
                [{ text: 'Continuer', action: callback }]
            );
        } else {
            const victim = Game.killScout('La neige était glissante.');
            if (victim) {
                Game.modifyResource('morale', -18);
                UI.showText(
                    `${victim} glisse. Tente de se rattraper. Glisse encore.\n\nLa pente était plus raide qu'elle n'en avait l'air.\n\nLa neige était glissante.`,
                    [{ text: 'Continuer', action: () => Events.showQuip(callback) }]
                );
            } else {
                callback();
            }
        }
    },
    
    // Show random scout quip after death
    showQuip(callback) {
        if (Math.random() < 0.4) {
            const quip = this.scoutQuips[Math.floor(Math.random() * this.scoutQuips.length)];
            const scouts = Game.state.party.filter(s => s.alive);
            const speaker = scouts[Math.floor(Math.random() * scouts.length)];
            
            setTimeout(() => {
                UI.showSpeechBubble(speaker.name, quip, 3000);
            }, 1000);
        }
        
        callback();
    }
};
