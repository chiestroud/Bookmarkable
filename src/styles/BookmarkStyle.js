import styled from 'styled-components';

const HeadStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputStyle = styled.div`
  width: 250px;
  display: flex;
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
  HeadStyle, InputStyle, CardStyle, IndividualCardStyle
};
