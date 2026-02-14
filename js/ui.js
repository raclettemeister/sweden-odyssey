// Sweden Odyssey — UI Management
// Text boxes, tabs, HUD updates, and UI interactions

const UI = {
    textBox: null,
    textContent: null,
    choiceButtons: null,
    continuePrompt: null,
    tabOverlay: null,
    
    init() {
        this.textBox = document.getElementById('text-box');
        this.textContent = document.getElementById('text-content');
        this.choiceButtons = document.getElementById('choice-buttons');
        this.continuePrompt = document.getElementById('continue-prompt');
        this.tabOverlay = document.getElementById('tab-overlay');
        
        // Tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.openTab(btn.dataset.tab);
            });
        });
        
        // Close tab button
        document.querySelector('.close-tab').addEventListener('click', () => {
            this.closeTab();
        });
        
        // CRT toggle
        document.getElementById('crt-toggle').addEventListener('click', () => {
            Game.canvas.classList.toggle('crt-mode');
        });
        
        // Continue button
        document.getElementById('continue-btn').addEventListener('click', () => {
            if (this.continueCallback) {
                this.continueCallback();
                this.hideText();
            }
        });
    },
    
    updateStats(state) {
        // Oregon Trail style stats display
        
        // Scouts count
        const scoutsEl = document.getElementById('stat-scouts');
        scoutsEl.textContent = state.scouts;
        scoutsEl.className = 'stat-value scouts-count';
        if (state.scouts < 10) {
            scoutsEl.classList.add('critical');
        }
        
        // Health (text-based)
        const healthEl = document.getElementById('stat-health');
        const healthText = {
            'good': 'Bonne',
            'fair': 'Correcte',
            'poor': 'Mauvaise',
            'very poor': 'Très mauvaise',
            'dead': 'Morte'
        };
        healthEl.textContent = healthText[state.health] || 'Bonne';
        healthEl.className = 'stat-value health-status';
        healthEl.classList.add(state.health.replace(' ', '-'));
        
        // Weather
        const weatherText = {
            'clear': 'Clair',
            'rain': 'Pluie',
            'storm': 'Tempête',
            'snow': 'Neige'
        };
        document.getElementById('stat-weather').textContent = weatherText[state.weather] || 'Clair';
        
        // Pace
        const paceText = {
            'relaxed': 'Tranquille',
            'steady': 'Normale',
            'grueling': 'Forcée'
        };
        document.getElementById('stat-pace').textContent = paceText[state.pace] || 'Normale';
        
        // Rations
        const rationsText = {
            'filling': 'Normales',
            'meager': 'Réduites',
            'bare bones': 'Minimales'
        };
        document.getElementById('stat-rations').textContent = rationsText[state.rations] || 'Normales';
        
        // Food (in kg)
        document.getElementById('stat-food').textContent = Math.floor(state.food) + ' kg';
        
        // Money
        document.getElementById('stat-money').textContent = Math.floor(state.money) + ' SEK';
        
        // Distance to next landmark
        document.getElementById('stat-distance').textContent = Math.floor(state.distanceToNext) + ' km';
    },
    
    updateDayInfo(state) {
        const phaseNames = {
            morning: 'Matin',
            afternoon: 'Après-midi',
            camp: 'Camp'
        };
        
        document.getElementById('day-info').textContent = 
            `Jour ${state.day} / 14 — ${phaseNames[state.phase]}`;
        document.getElementById('location-info').textContent = state.location;
    },
    
    showText(text, choices = null, callback = null) {
        this.textBox.classList.remove('hidden');
        
        // Type out text with simple effect
        this.textContent.textContent = '';
        let index = 0;
        const typeSpeed = 20;
        
        const type = () => {
            if (index < text.length) {
                this.textContent.textContent += text[index];
                index++;
                setTimeout(type, typeSpeed);
            } else {
                // Text done, show choices or continue button
                if (choices && choices.length > 0) {
                    this.showChoices(choices);
                } else if (callback) {
                    this.continueCallback = callback;
                    this.continuePrompt.classList.remove('hidden');
                }
            }
        };
        
        // Clear previous
        this.choiceButtons.innerHTML = '';
        this.continuePrompt.classList.add('hidden');
        
        type();
    },
    
    showChoices(choices) {
        this.choiceButtons.innerHTML = '';
        
        choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = `[${String.fromCharCode(65 + index)}] ${choice.text}`;
            btn.addEventListener('click', () => {
                this.hideText();
                if (choice.action) choice.action();
            });
            this.choiceButtons.appendChild(btn);
            
            // Keyboard support
            const key = String.fromCharCode(65 + index).toLowerCase();
            document.addEventListener('keydown', function handler(e) {
                if (e.key === key) {
                    btn.click();
                    document.removeEventListener('keydown', handler);
                }
            });
        });
    },
    
    hideText() {
        this.textBox.classList.add('hidden');
        this.textContent.textContent = '';
        this.choiceButtons.innerHTML = '';
        this.continuePrompt.classList.add('hidden');
        this.continueCallback = null;
    },
    
    openTab(tabName) {
        const tabInner = document.getElementById('tab-inner');
        this.tabOverlay.classList.remove('hidden');
        
        if (tabName === 'map') {
            this.renderMapTab(tabInner);
        } else if (tabName === 'journal') {
            this.renderJournalTab(tabInner);
        } else if (tabName === 'status') {
            this.renderStatusTab(tabInner);
        } else if (tabName === 'inventory') {
            this.renderInventoryTab(tabInner);
        }
    },
    
    closeTab() {
        this.tabOverlay.classList.add('hidden');
    },
    
    renderMapTab(container) {
        let html = '<h2>CARTE DE SUÈDE</h2>';
        html += '<div class="map-container">';
        html += '<p style="color: #cccccc; margin-bottom: 20px;">Stockholm → Storlien | 750 km</p>';
        html += '<div class="map-route">';
        
        Game.route.forEach(location => {
            const isCurrent = location.day === Game.state.day;
            const isCompleted = location.day < Game.state.day;
            const className = isCurrent ? 'current' : (isCompleted ? 'completed' : '');
            
            html += `
                <div class="map-location ${className}">
                    <span class="map-day">Jour ${location.day}</span>
                    <span class="map-name">${location.location}</span>
                    <span class="map-type">${location.type}</span>
                </div>
            `;
        });
        
        html += '</div></div>';
        container.innerHTML = html;
    },
    
    renderJournalTab(container) {
        let html = '<h2>JOURNAL DE BORD</h2>';
        
        if (Game.state.journalEntries.length === 0) {
            html += '<p style="color: #888;">Aucune entrée pour le moment.</p>';
        } else {
            html += '<div class="journal-entries">';
            
            Game.state.journalEntries.forEach(entry => {
                const phaseNames = { morning: 'Matin', afternoon: 'Après-midi', camp: 'Camp' };
                html += `
                    <div class="journal-entry">
                        <div class="journal-header">Jour ${entry.day} — ${phaseNames[entry.phase]}</div>
                        <div class="journal-text">${entry.text}</div>
                    </div>
                `;
            });
            
            html += '</div>';
        }
        
        container.innerHTML = html;
    },
    
    renderStatusTab(container) {
        let html = '<h2>ÉTAT DE L\'ÉQUIPE</h2>';
        html += `<p style="color: #E8A832; font-size: 18px; margin-bottom: 20px;">
            ${Game.state.scouts} / ${Game.state.maxScouts} scouts vivants
        </p>`;
        
        html += '<h3>Scouts Nommés</h3>';
        html += '<div class="scouts-grid">';
        
        Game.state.party.forEach(scout => {
            const cardClass = scout.alive ? (scout.isHero ? 'scout-card hero' : 'scout-card') : 'scout-card dead';
            const status = scout.alive ? 
                `Santé: ${scout.health}% | Moral: ${scout.morale}%` : 
                '☠ Décédé';
            
            html += `
                <div class="${cardClass}">
                    <div class="scout-name">${scout.name}</div>
                    <div class="scout-role">${scout.role}</div>
                    <div class="scout-trait">${scout.trait}</div>
                    <div class="scout-status">${status}</div>
                </div>
            `;
        });
        
        html += '</div>';
        
        if (Game.state.deadScouts.length > 0) {
            html += '<h3 style="margin-top: 30px; color: #CC3333;">Perdus en Route</h3>';
            html += '<div style="color: #cccccc; font-size: 14px;">';
            Game.state.deadScouts.forEach(dead => {
                html += `<p><strong>${dead.name}</strong> — ${dead.cause}</p>`;
            });
            html += '</div>';
        }
        
        container.innerHTML = html;
    },
    
    renderInventoryTab(container) {
        let html = '<h2>INVENTAIRE</h2>';
        html += '<p style="color: #cccccc; margin-bottom: 20px;">Équipement du groupe</p>';
        
        html += '<div class="inventory-grid">';
        
        Game.state.inventory.forEach(item => {
            const conditionColors = {
                'Bon': '#66ff66',
                'Usé': '#ffff66',
                'Abîmé': '#ff9966',
                'Cassé': '#ff3333'
            };
            
            html += `
                <div class="inventory-item">
                    <div class="item-name">${item.name}</div>
                    <div class="item-condition" style="color: ${conditionColors[item.condition]}">
                        État: ${item.condition}
                    </div>
                    <div class="item-desc">${item.desc}</div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    },
    
    showSpeechBubble(scoutName, text, duration = 3000) {
        const bubble = document.createElement('div');
        bubble.className = 'speech-bubble';
        bubble.textContent = `${scoutName}: "${text}"`;
        bubble.style.left = (300 + Math.random() * 400) + 'px';
        bubble.style.top = (200 + Math.random() * 100) + 'px';
        
        document.getElementById('game-container').appendChild(bubble);
        
        setTimeout(() => {
            bubble.remove();
        }, duration);
    },
    
    showDeathMessage(scoutName, cause) {
        const msg = document.createElement('div');
        msg.className = 'death-message';
        msg.innerHTML = `
            <div style="font-size: 32px; margin-bottom: 15px;">☠</div>
            <div style="font-size: 24px; margin-bottom: 10px;">${scoutName}</div>
            <div style="font-size: 16px; color: #cccccc;">${cause}</div>
        `;
        
        document.getElementById('game-container').appendChild(msg);
        
        setTimeout(() => {
            msg.remove();
        }, 4000);
    }
};
