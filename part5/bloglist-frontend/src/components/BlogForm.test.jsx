import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<BlogForm />', async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm handleCreate={createBlog} />);

  const title = container.querySelector('#title-input');
  const author = container.querySelector('#author-input');
  const url = container.querySelector('#url-input');
  const sendButton = screen.getByText('create');

  await user.type(title, 'form test');
  await user.type(author, 'author');
  await user.type(url, 'https://hello.com');
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('form test');
  expect(createBlog.mock.calls[0][0].author).toBe('author');
  expect(createBlog.mock.calls[0][0].url).toBe('https://hello.com');
});
