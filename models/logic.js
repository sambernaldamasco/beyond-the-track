//=====================
//  APP LOGIC
//=====================
const logic = {
  average:{
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
      const agilityAvg = logic.average.agility(skater)
      const fitnessAvg = logic.average.fitness(skater)
      const teamworkAvg = logic.average.teamwork(skater)
      const coachabilityAvg = logic.average.coachability(skater)
      const totalAvg = Math.floor((agilityAvg + teamworkAvg + coachabilityAvg + fitnessAvg)/4)

      return {agility:agilityAvg, fitness:fitnessAvg, teamwork:teamworkAvg, coachability:coachabilityAvg, total:totalAvg}
    }
  },

   dataManipulation:{
    veteranSkater (data) {
      data = {
        name:data.name,
        skills: {
          agility:{
            lateralMovement: 3,
            hockeyStop: 3,
            plowStop: 3,
            turningToeStop: 3,
            powerSlide: 3,
            transitions: 3,
            backwardsSkating: 3
          },
          fitness:{
            speedEndurance: 3,
            recovery: 3,
          },
          teamwork:{
            packwork: 3,
            strategyAdaptability: 3,
            awarenessCommunication: 3,
          },
          coachability: {
            proactiveness: 3,
            mentalRecovery: 3,
            sportspersonship: 3
          }
        }
      }
    return data
    } // end of the function
  } //end of the dataManipulation object
}


module.exports = logic
