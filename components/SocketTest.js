import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const socketUrl = 'wss://deadly-glowing-duckling.ngrok-free.app/api/ws';

export default function App() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(socketUrl);
        setSocket(ws);

        ws.onopen = () => {
            console.log('Connected to the server');
        };

        ws.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            console.log('Received message: ', receivedMessage);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error: ', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [username]);

    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const messageData = {
                author: username,
                message: message,
            };
            socket.send(JSON.stringify(messageData));
            setMessage('');
        } else {
            console.error('No WebSocket connection');
        }
    };

    return (
        <View style={styles.container}>
            {!loggedIn ? (
                <View style={styles.loginContainer}>
                    <Text style={styles.title}>Enter your username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Username"
                    />
                    <Button title="Login" onPress={() => setLoggedIn(true)} />
                </View>
            ) : (
                <View style={styles.chatContainer}>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => (
                            <View style={styles.messageContainer}>
                                <Text style={styles.author}>{item.author}:</Text>
                                <Text style={styles.message}>{item.message}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <TextInput
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type a message"
                    />
                    <Button title="Send" onPress={sendMessage} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },
    messageContainer: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    author: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    message: {
        flex: 1,
    },
});
