import './styles.scss';
import React, { Component } from 'react';
import { backend } from '../../services/axios';

export default class New extends Component {
  state = {
    author: '',
    place: '',
    description: '',
    hashtags: '',
    image: null,
    error: null
  };

  async handleSubmit(e) {
    e.preventDefault();

    try {
      this.setState({ error: null });
      const post = new FormData();

      post.append('author', this.state.author);
      post.append('place', this.state.place);
      post.append('description', this.state.description);
      post.append('hashtags', this.state.hashtags);
      post.append('image', this.state.image);

      await backend.post('/posts', post);

      this.props.history.push('/');
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleInputFile = ({ target }) => {
    this.setState({ image: target.files[0] });
  };

  render() {
    return (
      <form className="new-form" onSubmit={this.handleSubmit.bind(this)}>
        <input type="file" id="image" onChange={this.handleInputFile} />

        <input
          type="text"
          name="author"
          placeholder="Autor do post"
          onChange={this.handleInputChange}
          value={this.state.author}
        />

        <input
          type="text"
          name="place"
          placeholder="Local do post"
          onChange={this.handleInputChange}
          value={this.state.place}
        />

        <input
          type="text"
          name="description"
          placeholder="Descrição do post"
          onChange={this.handleInputChange}
          value={this.state.description}
        />

        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags do post"
          onChange={this.handleInputChange}
          value={this.state.hashtags}
        />

        {this.state.error && <p className="new-error">{this.state.error}</p>}

        <button type="submit">Enviar</button>
      </form>
    );
  }
}
