import styled from "styled-components";
import PostModal from "./PostModal";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getArticleAPI } from "../actions";
import { getLikeValue } from "../actions";
import ReactPlayer from "react-player";

const Main = (props) => {
  // useEffect to show the data.
  useEffect(() => {
    props.getArticle();
    props.Like();
  }, []);

  const [showModal, setShowModal] = useState("close");

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  return (
    <>
      <Container>
        <ShareBox>
          <div>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} alt="" />
            ) : (
              <img src="/images/user.svg" />
            )}

            <button
              onClick={handleClick}
              disabled={props.loading ? true : false}
            >
              Start a post
            </button>
          </div>
          <div>
            <button>
              <img src="/images/photoLogo.png" alt="photoLogo" />
              <span>Photo</span>
            </button>
            <button>
              <img src="/images/video.png" alt="videoLogo" />
              <span>Video</span>
            </button>
            <button>
              <img src="/images/event.png" alt="eventLogo" />
              <span>Event</span>
            </button>
            <button>
              <img src="/images/writeArticle.png" alt="article" />
              <span>Write article</span>
            </button>
          </div>
        </ShareBox>
        {props.articles.length === 0 ? (
          <>
            <CardDisplayNothing>
              <p>There is no articles to show</p>
            </CardDisplayNothing>
          </>
        ) : (
          <Content>
            {props.loading && <img src="./images/loading.gif" />}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt="userImage" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>{article.actor.date}</span>
                      </div>
                    </a>
                    <button>
                      <img
                        src="/images/elipse.png"
                        alt="threeDot"
                        width="25px"
                      />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImage>
                    <a>
                      {!article.sharedImage && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (
                        article.sharedImg && <img src={article.sharedImg} />
                      )}
                    </a>
                  </SharedImage>
                  <SocialCount>
                    {/* <li>
                      <button>
                        <img
                          src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                          alt="Like"
                        />
                        <img
                          src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
                          alt="Like"
                        />
                        <span>75</span>
                      </button>
                    </li> */}
                    <li>
                      <a>
                        {article.like} likes and {article.comments} comments
                      </a>
                    </li>
                  </SocialCount>
                  <SocialAction>
                    <button onClick={props.Like()}>
                      <img src="/images/like.png" alt="likeButton" />
                      <span>Like</span>
                    </button>

                    <button>
                      <img src="/images/comments.png" alt="commentButton" />
                      <span>Comments</span>
                    </button>

                    <button>
                      <img src="/images/send.png" alt="sendButton" />
                      <span>Send</span>
                    </button>

                    <button>
                      <img src="/images/share.png" alt="shareButton" />
                      <span>Share</span>
                    </button>
                  </SocialAction>
                </Article>
              ))}
          </Content>
        )}
        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
    </>
  );
};

const Container = styled.div`
  grid-area: Main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 25%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  padding-top: 15px;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      background: transparent;
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 5px 0 -4px;
          width: 25px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  list-style: none;
  border-bottom: 1px solid #e9e5df;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
    }
  }
`;

const SocialAction = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  button {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    margin: 2px;
    background: transparent;
    border: none;
    img {
      width: 25px;
      height: 25px;
    }
    span {
      margin-left: 8px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      cursor: pointer;
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const CardDisplayNothing = styled.div`
  text-align: center;
  margin-top: 20px;
  height: 5rem;
  background: #fff;
  border: 2px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  & > p {
    margin-top: 10px;
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
    like: state.likeState.like,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getArticle: () => dispatch(getArticleAPI()),
  Like: () => dispatch(getLikeValue()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
