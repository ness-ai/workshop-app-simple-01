import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from "react-icons/fi";
import styled from '@emotion/styled';

const Home = ({ models }) => {

  const externalLinks = [
    { title: "HP", url: "https://ness-ness.studio.site/" },
    { title: "NOTE", url: "https://note.com/masakimorihara/m/m9639cdaa9d71" },
    { title: "SAMURAI ARCHITECTS", url: "https://www.samuraiarchitects.com/Rendery" },
    { title: "Supported by ASIBA", url: "https://asiba.or.jp/" },
  ];

  const styles = {
    container: {
      height: '100vh',
      background: 'white',
      color: 'black',
      display: 'flex',
      flexDirection: 'row',
      lignItems: 'stretch',
      gap: '2rem'
    },
    leftContainer: {
      display: 'flex',
      justifyContent: 'end',
      flexGrow: 1,
      flexDirection: 'column',
      background: '#C8FC04',
      gap: '3vh',
      width: '50%',
      margin: '0 auto',
      borderRight: '2px solid black',
      padding: '6vw 3vw',
      position: 'relative'
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
      color: 'black',
      ///border: '1px solid white'
    },
    linkTitle: {
      fontSize: '3.44vw',
      fontWeight: 'normal',
      margin: 0,
    },
    rightContainer: {
      display: 'flex',
      width: '50%',
      padding: '6vw 3vw'
      ///border: '1px solid black',
    },
    textBoxes:{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'

    },
    icon: {
      fontSize: '3rem',
      opacity: 1,
      transition: 'opacity 0.3s ease',
      marginLeft: '1rem'
    },
    h1Style: {
      fontSize: '3rem',
      fontWeight: '500',
      margin: '0px',
      marginBottom: '1.5rem'
    },
    text: {
      fontSize: '0.9rem',
      fontWeight: '500',
      width: '60%'
    },
    externalLinkContainer:{
      display: 'flex',
      alignItems: 'flex-end',
      flexGrow: '1',
      flexDirection: 'column',
      justifyContent: 'end',
      gap: '0vh'
    },
    linkSmall:{
      overflow: 'hidden',
      borderRadius: '0.5rem',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      textAlign: 'center',
      textDecoration: 'none',
      color: 'black',
    },
    linkTitleSmall:{
      fontSize: '1.5vw',
      fontWeight: 'normal',
      margin: 0,
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
    background-color: rgba(255, 255, 255, 1);
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
  const IconSmall = styled(FiArrowRight)`
    font-size: 2rem;
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  `;


  return (
    <div style={styles.container}> 
        <div style={styles.leftContainer}>
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
          <StyledLink
              key={"samurai"}
              to={'https://www.rendery.app/ja'}
              style={styles.link}
              target='_blank'
            >
              <h2 style={styles.linkTitle}>05. RENDERY</h2>
              <Icon className="arrow-icon" />
            </StyledLink>
        </div>
        <div style={styles.rightContainer}>
          <div style={styles.textBoxes}>
            <h3 style={{margin: '0px'}}>for regenerative urbanism</h3>
            <h1 style={styles.h1Style}>NESS WORKSHOP APP</h1>
            <p style={styles.text}>
              画像生成AIを用いた地域ワークショップアプリです。<br></br>
              地域の写真を学習させたAIモデルは、その街のらしさを反映した画像を生成します。
              従来の言葉による議論に比べ、画像を介した議論は参加者の想像の共有が簡単になります。
              これは、地域参加型ワークショップにどのような価値をもたらすのでしょうか。<br></br>
              <br></br>
              現在使用可能なAIモデルは左です。<br></br>
              これらは特定のワークショップの日のみ使用が可能です。<br></br>
              試してみたい方は、お気軽にお問い合わせください。
            </p>
            <div style={styles.externalLinkContainer}>
            {externalLinks.map((link, index) => (
              <React.Fragment key={index}>
                <StyledLink
                  key={index}
                  to={link.url}
                  style={styles.linkSmall}
                  target='_blank'
                >
                  <h2 style={styles.linkTitleSmall}>{link.title}</h2>
                  <IconSmall className="arrow-icon" />
                </StyledLink>
                {index === 1 && <div style={{height: '2rem'}} />}

              </React.Fragment>
          
        ))}
            </div>

          </div>
          
        </div>
    </div>
  );
};

export default Home;