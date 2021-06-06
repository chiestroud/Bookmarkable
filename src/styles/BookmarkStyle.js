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
`;

const IndividualCardStyle = styled.div`
  border: 2px solid red;
  width: 300px;
  display: flex;
  justify-content: center;
`;

export {
  HeadStyle, CardStyle, IndividualCardStyle, InputStyle
};
