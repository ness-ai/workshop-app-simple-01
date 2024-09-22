import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from "react-icons/fi";
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Home = ({ models }) => {
  const styles = {
    container: {
      height: '100vh',
      background: '#137dba',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
    },
    title: {
      fontSize: '3rem',
      fontWeight: 800,
      textAlign: 'center',
      margin: '1rem 0 2rem',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text'
    },
    nav: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      ///border: '1px solid white',
      width: '100%'
    },
    buttonContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flexGrow: 1,
      flexDirection: 'column',
      gap: '1rem',
      width: 'auto',
      margin: '0 auto',
      ///border: '1px solid white'
    },
    link: {
      minWidth: '100px',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '0.5rem',
      padding: '0.5rem',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      textAlign: 'center',
      textDecoration: 'none',
      color: 'white',
      ///border: '1px solid white'
    },
    linkTitle: {
      fontSize: '3rem',
      fontWeight: 'normal',
      margin: 0,
    },
    otherLinksContainer: {
      display: 'flex',
      width: '33%'
    },
    icon: {
      fontSize: '3rem',
      opacity: 1,
      transition: 'opacity 0.3s ease',
      marginLeft: '1rem'
    },
    text: {
      fontsize: '1rem',

    }

    
    
  };

  const StyledLink = styled(Link)`
  min-width: 100px;
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:hover .arrow-icon {
    transform: rotate(-45deg);
  }
`;

const Icon = styled(FiArrowRight)`
    font-size: 3.5rem;
    margin-left: 1rem;
    transition: transform 0.3s ease;
  `;


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>NESS WORKSHOP APP</h1>
      <nav style={styles.nav}>
        <div style={styles.buttonContainer}>
          {models.map((model) => (
            <StyledLink
              key={model.modelName}
              to={`/${model.modelName}`}
              style={styles.link}
            >
              <h2 style={styles.linkTitle}>{model.modelName}</h2>
              <Icon className="arrow-icon" />
            </StyledLink>
          ))}
        </div>
        <div style={styles.otherLinksContainer}>
          <p style={styles.text}>
            画像生成AIを用いた地域ワークショップアプリです。<br></br>
            地域の写真を学習させたAIモデルは、その街のらしさを反映した画像を生成します。
            従来の言葉による議論に比べ、画像を介した議論は参加者の想像の共有が簡単になります。
            これは、地域参加型ワークショップにどのような価値をもたらすのでしょうか。<br></br>
            <br></br>
            現在使用可能なAIモデルは左です。<br></br>
            これらは特定のワークショップの日のみ使用が可能です。<br></br>
            試してみたい方は、お気軽にお問い合わせください。
            <br></br><br></br><br></br><br></br><br></br>
            #note-link<br></br>
            #hp-link<br></br>
            #rendery-link
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Home;