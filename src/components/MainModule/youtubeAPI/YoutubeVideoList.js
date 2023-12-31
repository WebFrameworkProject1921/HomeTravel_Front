import React, { useState } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import Modal from 'react-modal';
import YoutubeModal from './YoutubeModal';
import { BiExpandAlt } from 'react-icons/bi';
import { PiPlusBold } from 'react-icons/pi';
import { HashLoader } from 'react-spinners';
import { BiSolidErrorAlt } from 'react-icons/bi';

// 모달 열기 버튼 스타일 지정
const ModalOpenButton = styled.button`
  position: absolute;
  bottom: -40px;
  left: 93%;
  transform: translateX(-50%);
  transition: 0.3s ease;
  z-index: 100;
  opacity: 0;
  width: 35px;
  height: 35px;
`;

const VideoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover ${ModalOpenButton} {
    opacity: 1;
  }
  height: 170px;
  border: 2px solid #202020;
`;

const VideoListContainer = styled.div`
  overflow-y: auto;
  gap: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 5px;
  backgroundcolor: black;
`;

Modal.setAppElement('#root');

// 사이드바에 표시할 재생 가능한 동영상 표시
const YoutubeVideoList = ({
  videos,
  toggleMenu = (f) => f,
  fetchMoreVideos,
  isLoading,
  isError,
  errorMessage,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false); // 모달 열림 여부
  const [selectedVideo, setSelectedVideo] = useState(null); // 모달 띄우기용 선택된 비디오 저장

  function openModal(video) {
    setIsOpen(true);
    setSelectedVideo(video);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {isLoading ? (
        <HashLoader />
      ) : isError ? (
        <>
          <BiSolidErrorAlt
            style={{
              width: '50px',
              height: '50px',
              color: 'red',
              marginBottom: '20px',
            }}
          />
          <div>{errorMessage}</div>
          <div>나중에 다시 시도해주세요...</div>
        </>
      ) : (
        <VideoListContainer>
          {videos.map((video, i) => (
            <VideoContainer key={i}>
              <YouTube
                key={video.id.videoId}
                videoId={video.id.videoId}
                opts={{
                  width: '290px',
                  height: '170px',
                  playerVars: {
                    autoplay: 0,
                    rel: 0,
                    modestbranding: 1,
                  },
                }}
                onEnd={(e) => {
                  e.target.stopVideo(0);
                }}
              />
              <ModalOpenButton
                onClick={() => {
                  openModal(video);
                  toggleMenu(); // 유튜브 바 닫기
                }}
              >
                <BiExpandAlt style={{ width: '100%', height: '100%' }} />
              </ModalOpenButton>
            </VideoContainer>
          ))}
          <VideoContainer
            style={{
              border: '4px dashed #a0a0a0',
              borderRadius: '10px',
              marginBottom: '20px',
            }}
            onClick={fetchMoreVideos}
          >
            <div
              style={{
                width: '280px',
                height: '170px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PiPlusBold
                style={{ width: '50px', height: '50px', color: '#404040' }}
              />
            </div>
          </VideoContainer>
          <YoutubeModal
            videos={videos}
            selectedVideo={selectedVideo}
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
          />
        </VideoListContainer>
      )}
    </>
  );
};

export default YoutubeVideoList;
