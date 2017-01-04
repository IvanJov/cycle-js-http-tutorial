import Cycle from '@cycle/xstream-run';
import xs from 'xstream';
import {div, h2, makeDOMDriver} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';

function main(sources) {
  const request$ = xs.periodic(1000)
    .mapTo({
      url: 'http://localhost:3000',
      category: 'api',
    });

  const vtree$ = sources.HTTP.select('api')
    .flatten()
    .map(res => res.body)
    .startWith({
      number: 0
    })
    .map(result =>
      div([
        h2('.label', `Random number from server: ${result.number}`)
      ])
    );

  return {
    DOM: vtree$,
    HTTP: request$
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#main'),
  HTTP: makeHTTPDriver()
});
