import prettier from 'prettier';

import generate from './generate-storybook';
import { hasGhosts, noGhosts } from './sample-ast';

describe('generate-storybook', () => {
  it('should generate storybook from ast', () => {
    const ast = hasGhosts;
    const code = `${generate(ast)}`;
    const prettyCode = prettier.format(code, {
      parser: 'babel',
      singleQuote: true,
    });
    expect(prettyCode).toMatchInlineSnapshot(`
      "import React from 'react';
      import { action } from '@storybook/addon-actions';
      import { withKnobs, text } from '@storybook/addon-knobs';

      import MyComponent from './MyComponent';

      export default {
        title: 'MyComponent',
        component: MyComponent,
        decorators: [withKnobs],
      };

      export const normal = () => (
        <MyComponent
          prop1={text('prop1', 'placeholder_prop1')}
          prop2={text('prop2', 'placeholder_prop2')}
          prop3={action('prop3OnClick')}
        />
      );

      normal.story = { name: 'normal' };
      "
    `);
  });
  it('should not crash if no ghosts', () => {
    const ast = noGhosts;
    const code = `${generate(ast)}`;
    const prettyCode = prettier.format(code, {
      parser: 'babel',
      singleQuote: true,
    });
    expect(prettyCode).toMatchInlineSnapshot(`
      "import React from 'react';
      import { action } from '@storybook/addon-actions';
      import { withKnobs, text } from '@storybook/addon-knobs';

      import MyComponent from './MyComponent';

      export default {
        title: 'MyComponent',
        component: MyComponent,
        decorators: [withKnobs],
      };

      export const normal = () => <MyComponent />;

      normal.story = { name: 'normal' };
      "
    `);
  });
});
