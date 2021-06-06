import styled from 'styled-components';

const HeadStyle = styled.div`
  padding: 2%;
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
  padding: 2%;
`;

const IndividualCardStyle = styled.div`
  border: 2px solid red;
  max-width: 25%;
  display: flex;
  justify-content: center;
`;

const CardButtonStyle = styled.div`
  display: grid;
  grid-template-columns: 15% 10% 15%;
`;

const SpanStyle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export {
  HeadStyle, CardStyle, IndividualCardStyle, InputStyle, CardButtonStyle, SpanStyle
};
