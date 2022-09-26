import { useState } from 'react';

const BlogsForm = ({ handleCreate }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const createBlog = (event) => {
    event.preventDefault();
    handleCreate(newBlog);
    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={createBlog}>
        <div>
          title:{' '}
          <input
            type='text'
            placeholder='Title'
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          author:
          <input
            type='text'
            placeholder='Author'
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          url:
          <input
            type='text'
            placeholder='Url'
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default BlogsForm;
