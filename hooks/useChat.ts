import { useState, useEffect, useCallback } from 'react';
import mqtt from 'mqtt';
import { ChatMessage } from '@/types';
import { saveMessageLocal, getMessagesLocal } from '@/lib/storage';
import { v4 as uuidv4 } from 'uuid';

const BROKER_URL = 'wss://broker.emqx.io:8084/mqtt';
const TOPIC_PREFIX = 'gather-app/events/';

export const useChat = (eventId: string, userId: string, userName: string) => {
    const [client, setClient] = useState<mqtt.MqttClient | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    // Load offline messages on mount
    useEffect(() => {
        const loadCached = async () => {
            const cached = await getMessagesLocal(eventId);
            setMessages(cached.sort((a, b) => a.timestamp - b.timestamp));
        };
        loadCached();
    }, [eventId]);

    useEffect(() => {
        console.log('Connecting to MQTT broker...');
        const mqttClient = mqtt.connect(BROKER_URL, {
            clientId: `gather_user_${userId}_${Math.random().toString(16).substr(2, 8)}`,
            clean: true,
            connectTimeout: 4000,
            reconnectPeriod: 1000,
        });

        mqttClient.on('connect', () => {
            console.log('Connected to MQTT');
            setIsConnected(true);
            mqttClient.subscribe(`${TOPIC_PREFIX}${eventId}`, (err) => {
                if (err) console.error('Subscription error:', err);
            });
        });

        mqttClient.on('message', async (topic, payload) => {
            const message: ChatMessage = JSON.parse(payload.toString());
            setMessages((prev) => {
                // Avoid duplicates
                if (prev.some(m => m.id === message.id)) return prev;
                return [...prev, message].sort((a, b) => a.timestamp - b.timestamp);
            });
            await saveMessageLocal(message);
        });

        mqttClient.on('error', (err) => {
            console.error('MQTT Error:', err);
            setIsConnected(false);
        });

        mqttClient.on('offline', () => {
            setIsConnected(false);
        });

        setClient(mqttClient);

        return () => {
            if (mqttClient) {
                mqttClient.end();
            }
        };
    }, [eventId, userId]);

    const sendMessage = useCallback((text: string) => {
        if (!client || !isConnected) {
            // Handle offline sending (queueing) - for now just alert
            console.warn('Offline: Cannot send message yet (Queueing not implemented in this demo)');
            return;
        }

        const message: ChatMessage = {
            id: uuidv4(),
            eventId,
            senderId: userId,
            senderName: userName,
            text,
            timestamp: Date.now(),
        };

        // Optimistic update
        setMessages(prev => [...prev, message]);
        saveMessageLocal(message);

        client.publish(`${TOPIC_PREFIX}${eventId}`, JSON.stringify(message), { qos: 1 });
    }, [client, isConnected, eventId, userId, userName]);

    return { messages, sendMessage, isConnected };
};
