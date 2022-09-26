import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';
import BlogsForm from '../components/BlogsForm';

describe('<Blog/>', () => {
  let container;
  let mockHandler;
  beforeEach(() => {
    const blog = {
      title: 'hello world',
      author: 'Wayne Rooney',
      url: 'https://www.wonderworld.com',
      likes: 77,
      user: { name: 'Ahmed Kasu', id: 'dcacblaicdaslcjb' },
    };
    mockHandler = jest.fn();
    container = render(
      <Blog blog={blog} handleDelete={mockHandler} handleUpdate={mockHandler} />
    ).container;
  });

  it('renders only the title and author by default', () => {
    const defaultRender = container.querySelector('.defaultDiv');
    const onViewClickRender = container.querySelector('.onViewClickDiv');
    expect(defaultRender).toHaveTextContent('hello world', 'Wayne Rooney');
    expect(defaultRender).not.toHaveStyle('display: none');
    expect(onViewClickRender).toHaveStyle('display: none');
  });

  it('renders the url, and number of likes when view is clicked', async () => {
    const defaultRender = container.querySelector('.defaultDiv');
    const onViewClickRender = container.querySelector('.onViewClickDiv');
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);
    screen.debug(onViewClickRender);
    expect(onViewClickRender).toHaveTextContent('https://www.wonderworld.com');
    expect(onViewClickRender).toHaveTextContent(77);
    expect(onViewClickRender).not.toHaveStyle('display: none');
    expect(defaultRender).toHaveStyle('display: none');
  });

  test('when like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup();
    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

describe('<BlogsForm/>', () => {
  let mockHandler;
  beforeEach(() => {
    mockHandler = jest.fn();
    render(<BlogsForm handleCreate={mockHandler} />);
  });

  it('calls the props event handler with the right details when a new blog is created', async () => {
    const user = userEvent.setup();

    const titleInput = screen.getByPlaceholderText('Title');
    const authorInput = screen.getByPlaceholderText('Author');
    const urlInput = screen.getByPlaceholderText('Url');

    const submitButton = screen.getByRole('button');

    await user.type(titleInput, 'Testing the blogs form');
    await user.type(authorInput, 'Ahmed Kasu');
    await user.type(urlInput, 'https://www.testing.com');

    await user.click(submitButton);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0].title).toBe('Testing the blogs form');
    expect(mockHandler.mock.calls[0][0].author).toBe('Ahmed Kasu');
    expect(mockHandler.mock.calls[0][0].url).toBe('https://www.testing.com');
  });
});
