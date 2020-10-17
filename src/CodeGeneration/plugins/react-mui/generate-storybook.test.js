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
          prop01={text('prop01', 'placeholder_prop01')}
          prop02={text('prop02', 'placeholder_prop02')}
          prop03={action('prop03OnClick')}
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
