document.addEventListener('DOMContentLoaded', () => {
    const levelElement = document.getElementById('level');
    const xpElement = document.getElementById('xp');
    const goldElement = document.getElementById('gold');
    const chopWoodButton = document.getElementById('chopWood');
    const mineStoneButton = document.getElementById('mineStone');
    const resetButton = document.getElementById('resetProgress');

    let level = 1;
    let xp = 0;
    let gold = 0;
    let xpToNextLevel = 10;

    function saveProgress() {
       const progress = {
           level: level,
           xp: xp,
           gold: gold,
           xpToNextLevel: xpToNextLevel
       };
       localStorage.setItem('gameProgress', JSON.stringify(progress));
   }

   // Functie om voortgang te laden
   function loadProgress() {
       const savedProgress = localStorage.getItem('gameProgress');
       if (savedProgress) {
           const progress = JSON.parse(savedProgress);
           level = progress.level;
           xp = progress.xp;
           gold = progress.gold;
           xpToNextLevel = progress.xpToNextLevel;
       }
   }

    function updateStats() {
        levelElement.textContent = level;
        xpElement.textContent = xp;
        goldElement.textContent = gold;
    }

    function gainXP(amount) {
        xp += amount;
        if (xp >= xpToNextLevel) {
            level++;
            xp = xp - xpToNextLevel;
            xpToNextLevel = Math.floor(xpToNextLevel * 1.5);
        }
        updateStats();
        saveProgress();
    }

    chopWoodButton.addEventListener('click', () => {
        gold += 1;
        gainXP(0.25);
    });

    mineStoneButton.addEventListener('click', () => {
        gold += 2;
        gainXP(0.5);
    });

    resetButton.addEventListener('click', () => {
        resetProgress();
    });

    function resetProgress() {
        level = 1;
        xp = 0;
        gold = 0;
        xpToNextLevel = 10;
        saveProgress();
        updateStats();
    }

    loadProgress();
    updateStats();
});
