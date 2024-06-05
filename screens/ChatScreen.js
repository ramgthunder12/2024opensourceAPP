// ChatScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [client, setClient] = useState(null);

  useEffect(() => {
    const sockJS = new SockJS('https://abd3-61-34-253-109.ngrok-free.app/');
    const stompClient = new Client({
      webSocketFactory: () => sockJS,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log('Connected');
        stompClient.subscribe('/topic/public', (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
      onDisconnect: () => {
        console.log('Disconnected');
      }
    });
    stompClient.activate();
    setClient(stompClient);

    return () => {
      if (client !== null) {
        client.deactivate();
      }
    };
  }, []);

  const sendMessage = () => {
    if (client !== null) {
      const chatMessage = {
        sender: 'User', // 실제 사용자 이름으로 변경
        content: input,
        type: 'CHAT'
      };
      client.publish({ destination: '/app/chat.sendMessage', body: JSON.stringify(chatMessage) });
      setInput('');
    }
  };

  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.sender}: {item.content}</Text>
          </View>
        )}
      />
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatScreen;
