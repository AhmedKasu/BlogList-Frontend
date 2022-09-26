import PropTypes from 'prop-types';
import { useState } from 'react';

const Blog = ({ blog, handleUpdate, handleDelete, loggedUser }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    handleUpdate(updatedBlog);
    console.log('blog', blog);
  };

  const deleteBlog = () => {
    handleDelete(blog.id);
  };

  return (
    <div className='blogs' style={blogStyle}>
      <div className='defaultDiv' style={hideWhenVisible}>
        {blog.title} {blog.author}{' '}
        <button className='view' onClick={toggleVisibility}>
          view
        </button>
      </div>
      <div className='onViewClickDiv' style={showWhenVisible}>
        <div>
          {blog.title} {blog.author}{' '}
          <button className='hide' onClick={toggleVisibility}>
            hide
          </button>
        </div>
        <div>{blog.url}</div>
        <div id='likesDiv'>
          likes {blog.likes}{' '}
          <button id='like' onClick={handleLikes}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <button
          style={{ display: `${blog.user.name === loggedUser ? '' : 'none'}` }}
          id='delete'
          onClick={deleteBlog}>
          remove
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
