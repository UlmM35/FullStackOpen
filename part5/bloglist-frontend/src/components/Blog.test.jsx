import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;
  const mockHandler = vi.fn();

  const blog = {
    title: 'blog 2',
    author: 'author 2',
    likes: 0,
    url: 'https://hello.man.com',
    user: {
      name: 'user',
      username: 'user',
      id: '5',
    },
  };

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={blog.user} handleUpdate={mockHandler} />,
    ).container;
  });

  test('renders blog title and author but not the url or likes by default', () => {
    const title = screen.getByText('blog 2');
    const author = screen.getByText('author 2');
    const div = container.querySelector('.blogHidden');

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(div).not.toHaveStyle('display: none');
  });

  test('renders the url and likes when the button controlling the shown details is clicked', async () => {
    const user = userEvent.setup();
    const button = container.querySelector('.viewButton');
    await user.click(button);

    const title = screen.getByText('blog 2');
    const author = screen.getByText('author 2');
    const likes = screen.getByText('likes 0');
    const url = screen.getByText('https://hello.man.com');
    const div = container.querySelector('.blogHidden');

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(likes).toBeDefined();
    expect(url).toBeDefined();
    expect(div).toHaveStyle('display: none');
  });

  test('if the like button is clicked twice the event handler is called twice', async () => {
    const user = userEvent.setup();
    const showButton = container.querySelector('.viewButton');
    await user.click(showButton);

    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
