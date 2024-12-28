import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from 'axios'


export function useContent(refreshTrigger : number) {
    const [contents, setContents] = useState([]);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                //@ts-ignore
                setContents(response.data.content);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchContent();
    }, [refreshTrigger]); // Re-fetch when refreshTrigger changes

    return contents;
}