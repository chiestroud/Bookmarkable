import styled from 'styled-components';

const HeadStyle = styled.div`
  margin : 2%;
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: auto;
`;

const InputStyle = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
`;

const CardStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2%;
`;

const IndividualCardStyle = styled.div`
  max-width: 31%;
  display: flex;
  justify-content: center;
  margin: 1.1%;
`;

const CardButtonStyle = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  margin-bottom: 1%;
`;

const SpanStyle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
`;

export {
  HeadStyle, CardStyle, IndividualCardStyle, InputStyle, CardButtonStyle, SpanStyle, ButtonStyle
};
