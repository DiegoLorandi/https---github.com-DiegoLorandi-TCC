//TodoList.js
import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function TodoList({
  item,
  chaves,
  widthArray,
  navigation,
  editCb,
  removeCb,
}) {
  return (
    <ComponentContainer>
      <ListContainer>
        {chaves &&
          chaves.map((chave, index) => (
            <TextItem key={index} width={widthArray[index]}>
              {item[chave]}
            </TextItem>
          ))}
        <IconContainer>
          <Stat>
            <Icon
              name="pen"
              size={12}
              color="#ffffff"
              onPress={editCb}
              style={{
                backgroundColor: '#007bff',
                padding: 4,
                borderRadius: 8,
              }}
            />
          </Stat>
          <Stat>
            <Icon
              name="trash"
              size={12}
              color="#ffffff"
              onPress={removeCb}
              style={{
                backgroundColor: '#dc3545',
                padding: 4,
                borderRadius: 8,
              }}
            />
          </Stat>
        </IconContainer>
        {/* </View> */}
      </ListContainer>
    </ComponentContainer>
  );
}

const IconContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: auto;
  margin-right: 1px;
`;

const Stat = styled.View`
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const ListContainer = styled.View`
  background-color: whitesmoke;
  width: 100%;
  padding: 5px;
  flex-direction: row;
  flex-wrap: wrap;
  background: #fff;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
  border-bottom-width: 1px;
  border-bottom-color: #f1f3f4;
`;

const TextItem = styled.Text`
  color: black;
  height: auto;
  width: ${(props) => (props.width ? `${props.width}px` : auto)}
  font-size: 16px;
  font-family: poppins-regular;
`;
