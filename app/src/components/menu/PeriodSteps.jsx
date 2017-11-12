import React from 'react';
import P from 'prop-types';
import { Step, Icon } from 'semantic-ui-react';
import PeriodType from '../../../../shared/types/PeriodType';

const stepMaps = [
  {
    period: PeriodType.SUGGEST,
    order: 0,
    title: 'Suggestion an instrument',
    icon: 'discussions',
  },
  {
    period: PeriodType.VOTE,
    order: 1,
    title: 'Vote vote vote!',
    icon: 'star',
  },
  {
    period: PeriodType.DISPLAY,
    order: 2,
    title: 'This time we will invest in...',
    icon: 'percent',
  },
];

class PeriodSteps extends React.Component {
  displayName: 'PeriodSteps';

  renderStep = (step) => {
    const { period, daysToNextPeriod, elapsedPeriodDays } = this.props;

    const activeStep = stepMaps.find(i => i.period === period) || {};

    const isDone = step.order < activeStep.order;
    const isFuture = step.order > activeStep.order;
    const isActive = step.order === activeStep.order;

    return (
      <Step completed={isDone} disabled={isFuture} active={isActive} key={`step-${step.period}`}>
        <Icon name={step.icon} />
        <Step.Content>
          <Step.Title>{ step.title }</Step.Title>
          <Step.Description>
            { isActive
              ? (<span><b>{daysToNextPeriod} days left</b> (of total {elapsedPeriodDays + daysToNextPeriod})</span>)
              : ''
            }
          </Step.Description>
        </Step.Content>
      </Step>
    );
  };

  render() {
    return (
      <Step.Group widths={3}>
        { stepMaps.map(this.renderStep) }
      </Step.Group>
    );
  }
}

PeriodSteps.propTypes = {
  period: P.string.isRequired,
  daysToNextPeriod: P.number.isRequired,
  elapsedPeriodDays: P.number.isRequired,
};
export { PeriodSteps };
