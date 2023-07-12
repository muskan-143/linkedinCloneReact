import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { postArticleAPI } from "../actions";
import firebase from "firebase";

// Working of the Post modal image and video.

// At the very start shareImage, videoLink assetArea is blank.
// As it is blank so we will not be shown any of the way to upload because we have given the condition that the assertArea must be "image" or "media".
// When we click on the asset button it will first set the assertArea to "image" or the "media".

// 1. If we click to the image button assertArea is set as "image" and now we can see the code for it.
// It will show select image as we click on it => the function "handleChange" will be called that will set the shareImage as the image given  and hence using the "URL.createObjectURL" we are displaying the image

// 2. When we click on the video button assertArea is set as "video" and now we can see the code for it.
//  It will ask for the url and with the help of react-player we can show the video .

// We are calling the "reset" function when we click on the "close button image" which is given as the props from the main.js file

// 5:50:22
const PostModal = (props) => {
  const dateObject = new Date();
  const timeValue = `${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
  const dateValue = `${dateObject.getDate()}:${dateObject.getMonth()}:${dateObject.getFullYear()}`;

  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");

    props.handleClick(e);
  };

  const handleChange = (e) => {
    console.log(e);
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`Not a image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    e.preventDefault();

    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      time: timeValue,
      date: dateValue,
    };
    props.postArticle(payload);
    reset(e);
  };

  // console.log("In model file", props.user);
  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(event) => reset(event)}>
                <img src="/images/close-icon.png" alt="closeIcon" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>Name</span>
              </UserInfo>
              <Editor>
                <textarea
                  placeholder="What do you want to talk about?"
                  value={editorText}
                  autoFocus={true}
                  onChange={(e) => setEditorText(e.target.value)}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file"> Select an image to share</label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Please input a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/postPhoto.png" alt="" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="/images/postVideo.png" alt="" />
                </AssetButton>
              </AttachAssets>
              <SharedComment>
                <AssetButton>
                  <img src="/images/postComment.png" alt="" />
                  Anyone
                </AssetButton>
              </SharedComment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.4s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 70%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 25px;
    width: 25px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    border: none;
    background: transparent;
    cursor: pointer;

    img {
      width: 20px;
      height: 20px;
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 6px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  margin-left: 8px;
  background-color: transparent;
  border: none;
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;

  ${AssetButton} {
    width: 40px;
  }
`;

const SharedComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.8)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(255,255,255,0.4)" : "white")};
  &:hover {
    background: ${(props) =>
      props.disabled ? "rgba(0, 0, 0,0.08)" : "#004182"};
    color: ${(props) => (props.disabled ? "rgba(1,1,1,0.4)" : "white")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    min-height: 30px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
