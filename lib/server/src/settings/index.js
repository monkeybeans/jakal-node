const env2Int = name => parseInt(process.env[name]);

const settings = {
  period_suggest_start_day: env2Int('PERIOD_SUGGEST_START_DAY') || 10,
  period_voting_start_day: env2Int('PERIOD_VOTING_START_DAY') || 1,
  period_display_start_day: env2Int('PERIOD_DISPLAY_START_DAY') || 8,
};

export default settings;
