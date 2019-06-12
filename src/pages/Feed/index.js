import './styles.scss';
import React, { Component } from 'react';
import io from 'socket.io-client';
import { backend } from '../../services/axios';

import more from '../../assets/images/more.svg';
import like from '../../assets/images/like.svg';
import comment from '../../assets/images/comment.svg';
import send from '../../assets/images/send.svg';

export default class Feed extends Component {
  state = {
    feed: []
  };

  componentDidMount() {
    this.registerToSocket();
    this.fetchFeed();
  }

  async fetchFeed() {
    try {
      const response = await backend.get('/posts');
      this.setState({ feed: response.data });
    } catch (e) {
      console.log(e);
    }
  }

  registerToSocket() {
    const socket = io(backend.defaults.baseURL);

    socket.on('post', newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on('like', likePost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === likePost._id ? likePost : post
        )
      });
    });
  }

  async handleLike(id) {
    try {
      await backend.post(`/posts/${id}/like`);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { feed } = this.state;

    return (
      <section className="main-feed">
        {!feed.length && <p className="no-results">Não existe resultados.</p>}

        {feed.length > 0 &&
          feed.map(post => (
            <article key={post._id}>
              <header>
                <div className="feed-user">
                  <p title={post.author}>{post.author}</p>
                  <p className="place">{post.place}</p>
                </div>

                <img src={more} alt="Ver mais" />
              </header>

              <img
                src={post.imageFulPath}
                alt={`[${post.description}]`}
                title={post.description}
                className="image"
              />

              <footer>
                <div className="actions">
                  <img
                    src={like}
                    alt="Like"
                    onClick={() => this.handleLike(post._id)}
                  />
                  <img src={comment} alt="Comment" />
                  <img src={send} alt="Send" />
                </div>

                <b>{post.likes} curtidas</b>

                <div className="description">
                  <p title={post.description}>{post.description}</p>
                  <p className="hashtags">{post.hashtags}</p>
                </div>
              </footer>
            </article>
          ))}
      </section>
    );
  }
}
