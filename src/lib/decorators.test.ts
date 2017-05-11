import test from 'ava';
import { property } from './decorators';

class Test {
    @property('period_suggest_start_day')
    public startDay: number;
}

test('reads property from config file', t => {
    const test = new Test();

    t.is(typeof test.startDay, 'number');
});
