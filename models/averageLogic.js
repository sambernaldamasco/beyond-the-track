//=====================
//  APP LOGIC
//=====================
module.exports = {
  agility (skater) {
    const stats = skater.skills.agility
    const skillLength = Object.keys(skater.skills.agility).length -1
    let total = 0
    total += stats.lateralMovement
    total +=stats.hockeyStop
    total += stats.plowStop
    total += stats.turningToeStop
    total += stats.powerSlide
    total += stats.transitions
    total += stats.backwardsSkating

    total = Math.floor(total/skillLength)
    return total
  },

  fitness (skater) {
    const stats = skater.skills.fitness
    const skillLength = Object.keys(skater.skills.fitness).length -1
    let total = 0
    total += stats.speedEndurance
    total +=stats.recovery

    total = Math.floor(total/skillLength)
    return total
  },

  teamwork (skater) {
    const stats = skater.skills.teamwork
    const skillLength = Object.keys(skater.skills.teamwork).length -1
    let total = 0
    total += stats.packwork
    total +=stats.strategyAdaptability
    total +=stats.awarenessCommunication

    total = Math.floor(total/skillLength)
    return total
  },

  coachability (skater) {
    const stats = skater.skills.coachability
    const skillLength = Object.keys(skater.skills.coachability).length -1
    let total = 0
    total += stats.proactiveness
    total +=stats.mentalRecovery
    total +=stats.sportspersonship

    total = Math.floor(total/skillLength)
    return total
  },

  total (skater) {
    const agilityAvg = agilityAverage(skater)
    const fitnessAvg = fitnessAverage(skater)
    const teamworkAvg = teamworkAverage(skater)
    const coachabilityAvg = coachabilityAverage(skater)
    const totalAvg = Math.floor((agilityAvg + teamworkAvg + coachabilityAvg + fitnessAvg)/4)

    return {agility:agilityAvg, fitness:fitnessAvg, teamwork:teamworkAvg, coachability:coachabilityAvg, total:totalAvg}
  }
}
