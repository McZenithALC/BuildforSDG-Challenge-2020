const covid19ImpactEstimator = (data) => {
  const time = data.timeToElapse;
  const availableBeds = (data.totalHospitalBeds * (35 / 100));
  let factor;
  let days;
  const impact = {};
  const severeImpact = {};
  if ((data.periodType) === 'days') {
    days = time;
    factor = Math.trunc(((time / 3)));
  } else if ((data.periodType) === 'weeks') {
    days = (7 * time);
    factor = Math.trunc((((7 * time) / 3)));
  } else if (((data.periodType) === 'months')) {
    days = (30 * time);
    factor = (((30 * time) / 3));
  }
  impact.currentlyInfected = ((data.reportedCases) * 10);
  severeImpact.currentlyInfected = ((data.reportedCases) * 50);
  impact.infectionsByRequestedTime = (impact.currentlyInfected * (2 ** factor));
  severeImpact.infectionsByRequestedTime = (severeImpact.currentlyInfected * (2 ** factor));
  impact.severeCasesByRequestedTime = Math.trunc(
    (15 / 100) * impact.infectionsByRequestedTime
  );
  severeImpact.severeCasesByRequestedTime = Math.trunc(
    (15 / 100) * severeImpact.infectionsByRequestedTime
  );
  impact.hospitalBedsByRequestedTime = Math.trunc(
    availableBeds - (impact.severeCasesByRequestedTime)
  );
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(
    availableBeds - (severeImpact.severeCasesByRequestedTime)
  );
  impact.casesForICUByRequestedTime = Math.trunc(
    (5 / 100) * (impact.infectionsByRequestedTime)
  );
  severeImpact.casesForICUByRequestedTime = Math.trunc(
    (5 / 100) * (severeImpact.infectionsByRequestedTime)
  );
  impact.casesForVentilatorsByRequestedTime = Math.trunc(
    (2 / 100) * (impact.infectionsByRequestedTime)
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    (2 / 100) * (severeImpact.infectionsByRequestedTime)
  );
  impact.dollarsInFlight = Math.trunc(
    (
      (impact.infectionsByRequestedTime) * (data.region.avgDailyIncomePopulation)
      * (data.region.avgDailyIncomeInUSD)
    ) / (days)
  );
  severeImpact.dollarsInFlight = Math.trunc(
    (
      (severeImpact.infectionsByRequestedTime) * (data.region.avgDailyIncomePopulation)
      * (data.region.avgDailyIncomeInUSD)
    ) / (days)
  );
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
