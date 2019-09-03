const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('acceptedIf', () => {
  it('should pass with yes', async () => {
    const v = new Validator(
      { attr: 'yes', age: 16 },
      { attr: 'acceptedIf:age,16' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with empty value', async () => {
    const v = new Validator(
      { attr: '' },
      { attr: 'acceptedIf:age,16' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('should fail with no', async () => {
    const v = new Validator(
      { attr: 'no', age: 16 },
      { attr: 'acceptedIf:age,16' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should throw exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|acceptedIf' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Invalid arguments supplied for field attribute in acceptedIf rule.');
    }

    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|acceptedIf:1,2,3' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Invalid arguments supplied for field attribute in acceptedIf rule.');
    }
  });

  it('message should exists', async () => {
    const v = new Validator(
      { attr: 'no', age: 16 },
      { attr: 'acceptedIf:age,16' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'acceptedIf',
        value: 'no',
        attr: 'attr',
        args: ['age', '16'],
      }),
    );
  });
});
