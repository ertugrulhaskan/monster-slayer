function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      roundCounter: 0,
      healCounter: 3,
      winner: null,
      gameLogs: [],
    };
  },
  watch: {
    monsterHealth(value) {
      if (value <= 0) {
        this.monsterHealth = 0;
        this.winner =
          this.monsterHealth === 0 && this.playerHealth === 0
            ? 'draw'
            : 'player';
      }
    },
    playerHealth(value) {
      if (value <= 0) {
        this.playerHealth = 0;
        this.winner =
          this.monsterHealth === 0 && this.playerHealth === 0
            ? 'draw'
            : 'monster';
      }
      if (value > 100) {
        this.playerHealth = 100;
      }
    },
    roundCounter(value) {
      if (value > 3) {
        this.roundCounter = 0;
      }
    },
  },
  computed: {
    monsterBarStyle() {
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyle() {
      return { width: this.playerHealth + '%' };
    },
  },
  methods: {
    newGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.roundCounter = 0;
      this.healCounter = 3;
      this.winner = null;
      this.gameLogs = [];
    },
    playerAttack() {
      if (this.roundCounter > 0) {
        this.roundCounter++;
      }
      playerAttackVal = getRandom(10, 5);
      this.monsterHealth -= playerAttackVal;
      this.monsterAttack(15, 10);
      this.logsPrint('player', 'attack', playerAttackVal);
    },
    specialAttack() {
      this.roundCounter++;
      playerAttackVal = getRandom(20, 10);
      this.monsterHealth -= playerAttackVal;
      this.monsterAttack(15, 5);
      this.logsPrint('player', 'special-attack', playerAttackVal);
    },
    heal() {
      this.healCounter--;
      healVal = getRandom(30, 15);
      this.playerHealth += healVal;
      this.monsterAttack(15, 5);
      this.logsPrint('player', 'heal', healVal);
    },
    monsterAttack(maxDamage, minDamage) {
      monsterAttackVal = getRandom(maxDamage, minDamage);
      this.playerHealth -= monsterAttackVal;
      this.logsPrint('monster', 'attack', monsterAttackVal);
    },
    logsPrint(who, what, value) {
      this.gameLogs.unshift({
        actionWho: who,
        actionWhat: what,
        actionValue: value,
      });
    },
  },
});

app.mount('#app');
