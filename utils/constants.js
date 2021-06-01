module.exports = {
  readyTime: 3,
  baseActionPoints: 5,
  critHit: 0.05,
  critPerHex: 0.05,
  globalCooldown: 0.5,
  hexStackCount: 3,
  hexTime: 10,
  intelRegen: 1.5,
  totalEnergy: 100,
  healthRegen: [3, 5, 9, 15, 25, 35, 35, 35, 35],
  channelRegenSpeed: 2,
  moveSameIsland: 1,
  moveOtherIsland: 2,
  critMultiplier: 3,
  islands: 3,
  spell: {
    hex: {
      cost: 1,
      min: 1,
      max: 3,
    },
    atk1: {
      cost: 2,
      min: 2,
      max: 6,
    },
    atk2: {
      cost: 3,
      min: 6,
      max: 6,
    },
  },
}
