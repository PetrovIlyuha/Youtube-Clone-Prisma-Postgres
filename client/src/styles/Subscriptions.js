import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0.3rem 1.3rem;
  width: 100%;
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: 7rem;
  h4 {
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    letter-spacing: 1.2px;
    color: ${props => props.theme.secondaryColor};
    padding-left: 1.5rem;
  }

  .channel {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
  }

  .channel:hover {
    cursor: pointer;
    background: ${props => props.theme.darkGrey};
  }

  .channel img {
    margin-right: 1rem;
    width: 22px;
    height: 22px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export default Wrapper;
