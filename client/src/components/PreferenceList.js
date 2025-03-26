import React, { useEffect, useState } from "react";
import { ListGroup, Spinner, Alert } from "react-bootstrap";
import { fetchPreferences } from "./Preferenceapi";
import Pages from "./Pages";

const PreferenceList = () => {

    const [preferences, setPreferences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 10;

    const fetchData = async (currentPage) => {
        try {
            setLoading(true);
            const response = await fetchPreferences(currentPage, limit);
            setPreferences(response.rows || []);
            setTotalCount(response.count || 0);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const handlePage = (newPage) => {
        setPage(newPage);
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <>
            <ListGroup>
                <ListGroup.Item variant="dark">
                    <strong>Students' favorite dishes</strong>
                </ListGroup.Item>
                {preferences.length > 0 ? (
                    preferences.map((preference) => (
                        <ListGroup.Item key={preference.preference_id}>
                            {preference.student ?
                                `${preference.student.name} ${preference.student.surname}` :
                                "Unknown student"}: {preference.dish_name}
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>No data</ListGroup.Item>
                )}
            </ListGroup>
            {totalCount > limit && (
                <div className="mt-2">
                    <Pages
                        totalCount={totalCount}
                        limit={limit}
                        page={page}
                        handlePage={handlePage}
                    />
                </div>
            )}
        </>
    );
};

export default PreferenceList;
