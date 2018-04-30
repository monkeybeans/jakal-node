const env2Int = name => parseInt(process.env[name]);

const settings = {
  period_suggest_start_day: env2Int('PERIOD_SUGGEST_START_DAY') || 20,
  period_voting_start_day: env2Int('PERIOD_VOTING_START_DAY') || 25,
  period_display_start_day: env2Int('PERIOD_DISPLAY_START_DAY') || 30,
};

export default settings;
