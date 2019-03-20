# Global

We defined the following test levels.

## Unit Tests

All unit tests should be regrouped in files named `*.unittest.js`.

Running `npm run test` will then launch all the defined unit tests.
If you want to only test some components, you may use the command `npm run test -- -f keyword` with *keyword* allowing to filter on the test names. 

### Coverage

If you want to check the unit test coverage, you may use the command `npm run coverage` which will output the details and summary of the coverage and it will also generate an HTML interface (found in `app/coverage/index.html`) allowing to navigate through the code and check the coverage.

## Functional tests

To be added later

*Ideas*:

* (very simple) bot speaking to DANA to validate each workflow (one test per story scenario)
* .
