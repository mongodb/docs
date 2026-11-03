import { render, act } from '@testing-library/react';
import { IoCodeBlock } from '@/mdx-components/IOCode';
import { Output } from '@/mdx-components/IOCode/Output';
import { Code } from '@/mdx-components/Code';

describe('CodeIO', () => {
  it('renders correctly', () => {
    const tree = render(
      <IoCodeBlock>
        <>
          <Code
            lang="python"
            copyable={true}
            caption="Title of Example"
            value={'print("hello world")'}
            emphasize_lines={[1, 1]}
            linenos={true}
          />
        </>
        <Output>
          <Code
            lang="python"
            caption="Title of Example"
            value={'hello world'}
            emphasize_lines={[1, 1]}
            linenos={true}
          />
        </Output>
      </IoCodeBlock>,
    );
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('closes and opens output code snippet on io button click when output is visible by default', async () => {
    const renderResult = render(
      <IoCodeBlock>
        <>
          <Code
            lang="python"
            copyable={true}
            caption="Title of Example"
            value={'print("hello world")'}
            emphasize_lines={[1, 1]}
            linenos={true}
          />
        </>
        <Output>
          <Code
            lang="python"
            caption="Title of Example"
            value={'hello world'}
            emphasize_lines={[1, 1]}
            linenos={true}
          />
        </Output>
      </IoCodeBlock>,
    );

    const button = renderResult.getByRole('button', { name: /output/ });
    const outputContent = renderResult.container.querySelector('[data-io-output]');

    await act(async () => {
      button.click();
    });
    expect(outputContent).not.toBeVisible();

    await act(async () => {
      button.click();
    });
    expect(outputContent).toBeVisible();
  });

  it('opens and closes output code snippet on io button click when output is hidden by default', async () => {
    const renderResult = render(
      <IoCodeBlock>
        <>
          <Code
            lang="python"
            copyable={true}
            caption="Title of Example"
            value={"print('hello world')"}
            emphasize_lines={[1, 1]}
            linenos={true}
          />
        </>
        <Output visible={false}>
          <Code
            lang="python"
            caption="Title of Example"
            value={'hello world'}
            emphasize_lines={[1, 1]}
            linenos={true}
          />
        </Output>
      </IoCodeBlock>,
    );

    const button = renderResult.getByRole('button', { name: /output/ });

    await act(async () => {
      button.click();
    });
    expect(renderResult.container.querySelector('[data-io-output]')).toBeVisible();

    await act(async () => {
      button.click();
    });
    expect(renderResult.container.querySelector('[data-io-output]')).not.toBeVisible();
  });
});
