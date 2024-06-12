import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import ipAdress from "../configs/ipAdress.json";

const LocationComponent = () => {
    const [location, setLocation] = useState(null);

    const updateLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        const locationString = `${location.coords.latitude}:${location.coords.longitude}`;
        await AsyncStorage.setItem('location', locationString);
        const id = JSON.parse(await AsyncStorage.getItem('id'));
        const response = await axios.put(`${ipAdress.ngrokServerAdress}/users/location/${id}`, {
            headers:{
                'Content-Type':'application/json',
            },
            location:locationString
        });

        console.log(locationString);
    };

    useFocusEffect(
        React.useCallback(() => {
            // 스크린이 포커스를 받을 때마다 초기화
            setLocation(null);
            updateLocation();
        }, [])
    );

};

export default LocationComponent;