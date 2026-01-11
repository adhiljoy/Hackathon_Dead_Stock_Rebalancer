import React, { useEffect, useState } from 'react';
import { turso } from '../utils/turso';

const TursoExample = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Example query - replace 'users' with your actual table name
                // const result = await turso.execute("SELECT * FROM users");

                // For demonstration, we just check connection if no table exists yet
                // You might see an error if the table doesn't exist
                const result = await turso.execute("SELECT 1 as connected");

                setData(result.rows);
                setLoading(false);
            } catch (err) {
                console.error("Turso error:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading data from Turso...</div>;
    if (error) return <div style={{ color: 'red' }}>Error connecting to Turso: {error}</div>;

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px' }}>
            <h2>Turso Connection Status</h2>
            <p>Connection successful!</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <p>
                <small>Check <code>src/components/TursoExample.jsx</code> to see how this works.</small>
            </p>
        </div>
    );
};

export default TursoExample;
